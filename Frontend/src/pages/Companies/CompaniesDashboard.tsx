import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { superAdminService } from '../../services/superAdminService';
import { fDate } from '../../utils/Date_format';
import DynamicForm, { FormField } from '../../components/common/DynamicForm';
import DataTable, { Column } from '../../components/common/DataTable';
import { Modal } from '../../components/ui/modal';
import Alert from '../../components/ui/alert/Alert';

export default function CompaniesDashboard() {
  const defaultValues = { companyName: '', sebiRegNo: '', email: '', mobile: '', address: '', validity: '' };
  const [formValues, setFormValues] = useState<Record<string, any>>(defaultValues);
  const [editId, setEditId] = useState<string | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'create' | 'update' | 'delete' | 'toggle';
    id?: string;
    data?: any;
    resetForm?: () => void;
    message: string;
  } | null>(null);
  const [toast, setToast] = useState<{ variant: "success" | "error", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };
  
  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const fetchCompanies = async () => {
    try {
      const response = await superAdminService.getCompanies({ page: currentPage, limit, search: searchTerm });
      // Depending on backend structure, data might be nested:
      if (response.data && Array.isArray(response.data)) {
        setCompanies(response.data);
        setTotalCount(response.totalCount || response.total || response.data.length);
      } else {
        setCompanies(Array.isArray(response) ? response : []);
        setTotalCount(Array.isArray(response) ? response.length : 0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, limit, searchTerm]);

  const handleSubmit = (data: Record<string, any>, resetForm: () => void) => {
    if (editId) {
      setConfirmAction({ type: 'update', id: editId, data, resetForm, message: 'Are you sure you want to update this company details?' });
    } else {
      setConfirmAction({ type: 'create', data, resetForm, message: 'Are you sure you want to create this new company?' });
    }
  };

  const executeAction = async () => {
    if (!confirmAction) return;
    try {
      if (confirmAction.type === 'create') {
        const response = await superAdminService.createCompany(confirmAction.data);
        setShowForm(false);
        confirmAction.resetForm?.();
        showToast('success', 'Company Created', response.message || 'The new RA Entity has been registered successfully.');
      } else if (confirmAction.type === 'update') {
        const response = await superAdminService.updateCompany(confirmAction.id!, confirmAction.data);
        setShowForm(false);
        setEditId(null);
        setFormValues(defaultValues);
        confirmAction.resetForm?.();
        showToast('success', 'Company Updated', response.message || 'The company details were updated successfully.');
      } else if (confirmAction.type === 'delete') {
        const response = await superAdminService.deleteCompany(confirmAction.id!);
        showToast('success', 'Company Deleted', response.message || 'The company was permanently deleted.');
      } else if (confirmAction.type === 'toggle') {
        const response = await superAdminService.toggleCompanyStatus(confirmAction.id!);
        showToast('success', 'Status Updated', response.message || 'The company status was toggled successfully.');
      }
      fetchCompanies();
      setConfirmAction(null);
    } catch (err: any) {
      console.error(err);
      showToast('error', 'Action Failed', err.message || 'An error occurred while performing the action.');
      setConfirmAction(null);
    }
  };

  const fields: FormField[] = [
    { name: 'companyName', label: 'Company Name', required: true },
    { name: 'sebiRegNo', label: 'SEBI Reg No.', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'mobile', label: 'Mobile', required: true },
    { name: 'validity', label: 'Validity Date', type: 'date', required: true },
    { name: 'address', label: 'Address', required: true },
  ];

  const columns: Column<any>[] = [
    { header: 'Company Name', accessorKey: 'companyName' },
    { header: 'SEBI Reg No.', accessorKey: 'sebiRegNo' },
    { header: 'Validity', cell: (row) => row.validity ? fDate(row.validity) : '-' },
    { 
      header: 'Status', 
      cell: (row) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${row.isActive ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Actions',
      align: 'right', 
      cell: (row) => (
        <div className="flex justify-end gap-3">
          <button onClick={() => handleEdit(row)} className="text-blue-500 hover:text-blue-600 font-medium">
            Edit
          </button>
          <button onClick={() => handleToggleStatus(row._id)} className={`${row.isActive ? 'text-orange-500 hover:text-orange-600' : 'text-green-500 hover:text-green-600'} font-medium`}>
            {row.isActive ? 'Disable' : 'Enable'}
          </button>
          <button onClick={() => handleDelete(row._id)} className="text-red-500 hover:text-red-600 font-medium">
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleEdit = (row: any) => {
    const editValues = {
      companyName: row.companyName || '',
      sebiRegNo: row.sebiRegNo || '',
      email: row.email || '',
      mobile: row.mobile || '',
      address: row.address || '',
      validity: row.validity ? row.validity.split('T')[0] : ''
    };
    setFormValues(editValues);
    setEditId(row._id);
    setShowForm(true);
  };

  const handleToggleStatus = (id: string) => {
    setConfirmAction({ type: 'toggle', id, message: 'Are you sure you want to change the active status of this company?' });
  };

  const handleDelete = (id: string) => {
    setConfirmAction({ type: 'delete', id, message: 'Are you sure you want to permanently delete this company? This action cannot be undone.' });
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Companies (Super Admin)" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Registered RA Entities</h2>
        <button onClick={() => {
          setFormValues(defaultValues);
          setEditId(null);
          setShowForm(!showForm);
        }} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
          {showForm ? 'Cancel' : '+ Add New Company'}
        </button>
      </div>

      {showForm && (
        <DynamicForm
          fields={fields}
          initialValues={formValues}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditId(null);
            setFormValues(defaultValues);
          }}
          submitButtonText={editId ? 'Update Company' : 'Save Company'}
        />
      )}

      <DataTable
        columns={columns}
        data={companies}
        keyExtractor={(row) => row._id}
        emptyMessage="No companies found"
        exportFileName="Companies_List"
        totalCount={totalCount}
        currentPage={currentPage}
        limit={limit}
        onPageChange={(page) => setCurrentPage(page)}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setCurrentPage(1); // Reset to first page
        }}
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1); // Reset to first page on search
        }}
      />

      <Modal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        className="max-w-md p-6"
      >
        <div className="text-center">
          <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${confirmAction?.type === 'delete' ? 'bg-red-100' : 'bg-brand-100'} mb-4`}>
            {confirmAction?.type === 'delete' ? (
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Confirm Action</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {confirmAction?.message}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setConfirmAction(null)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={executeAction}
              className={`px-4 py-2 text-white rounded-lg transition-colors ${confirmAction?.type === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-500 hover:bg-brand-600'}`}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[999999] shadow-xl rounded-xl transition-all duration-300">
          <Alert variant={toast.variant} title={toast.title} message={toast.message} />
        </div>
      )}
    </div>
  );
}
