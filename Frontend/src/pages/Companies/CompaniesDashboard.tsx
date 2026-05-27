import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { superAdminService } from '../../services/superAdminService';
import { fDate } from '../../utils/Date_format';
import DynamicForm, { FormField } from '../../components/common/DynamicForm';
import DataTable, { Column } from '../../components/common/DataTable';

export default function CompaniesDashboard() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  
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

  const handleSubmit = async (data: Record<string, any>, resetForm: () => void) => {
    try {
      await superAdminService.createCompany(data);
      setShowForm(false);
      resetForm();
      fetchCompanies();
    } catch (err) {
      console.error(err);
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
    { header: 'Validity', cell: (row) => fDate(row.validity) },
    {
      header: 'Actions',
      align: 'right', 
      cell: (row) => (
        <button onClick={() => handleDelete(row._id)} className="text-red-500 hover:text-red-600 font-medium">
          Delete
        </button>
      )
    }
  ];

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await superAdminService.deleteCompany(id);
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Companies (Super Admin)" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Registered RA Entities</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
          {showForm ? 'Cancel' : '+ Add New Company'}
        </button>
      </div>

      {showForm && (
        <DynamicForm
          fields={fields}
          initialValues={{ companyName: '', sebiRegNo: '', email: '', mobile: '', address: '', validity: '' }}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
          submitButtonText="Save Company"
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
    </div>
  );
}
