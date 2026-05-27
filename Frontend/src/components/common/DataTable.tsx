import React, { useState, useEffect, useRef } from 'react';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  keyExtractor?: (row: T, index: number) => string | number;
  // Server-side props
  totalCount?: number;
  currentPage?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onSearch?: (searchTerm: string) => void;
  exportFileName?: string;
}

export default function DataTable<T>({
  columns,
  data,
  emptyMessage = 'No data found',
  keyExtractor = (_, index) => index,
  totalCount = 0,
  currentPage = 1,
  limit = 10,
  onPageChange,
  onLimitChange,
  onSearch,
  exportFileName = "Export"
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]); // intentionally omitting onSearch to prevent loops

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  const exportCSV = () => {
    if (!data.length) return;
    const headers = columns.map(c => c.header).join(",");
    const rows = data.map(row => {
      return columns.map(col => {
        let val = "";
        if (col.accessorKey) {
          val = String(row[col.accessorKey] || "");
        }
        // Basic escaping
        return `"${val.replace(/"/g, '""')}"`;
      }).join(",");
    });
    
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportFileName}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(totalCount / limit) || 1;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      
      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 gap-4">
        {onSearch && (
          <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 text-sm border rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none focus:ring-1 focus:ring-brand-500 w-full md:w-64"
            />
            <button type="submit" className="px-4 py-2 bg-brand-500 text-white text-sm rounded-r-lg hover:bg-brand-600 transition-colors">
              Search
            </button>
          </form>
        )}

        <button 
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 rounded-lg transition-colors w-full md:w-auto justify-center"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 font-semibold ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {data.map((row, rowIndex) => (
              <tr key={keyExtractor(row, rowIndex)} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 ${
                      col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                    } ${colIndex === 0 ? 'font-medium text-gray-900 dark:text-white' : ''}`}
                  >
                    {col.cell ? col.cell(row) : (col.accessorKey ? String(row[col.accessorKey]) : null)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {(onPageChange || onLimitChange) && (
        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 gap-4">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            {onLimitChange ? (
              <select 
                value={limit} 
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-700 outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            ) : (
              <span>{limit}</span>
            )}
            <span>per page</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-4">Total: {totalCount} records</span>
            
            <button 
              disabled={currentPage <= 1}
              onClick={() => onPageChange?.(currentPage - 1)}
              className="px-3 py-1 rounded border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Prev
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange?.(currentPage + 1)}
              className="px-3 py-1 rounded border dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
