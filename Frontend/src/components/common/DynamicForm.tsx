import React, { useState, useEffect } from 'react';

export interface FormField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'date' | 'number' | 'password' | 'select' | 'tel';
  required?: boolean;
  options?: { label: string; value: string }[];
  colSpan?: 1 | 2;
}

interface DynamicFormProps {
  fields: FormField[];
  initialValues: Record<string, any>;
  onSubmit: (data: Record<string, any>, resetForm: () => void) => void;
  submitButtonText?: string;
  onCancel?: () => void;
}

export default function DynamicForm({
  fields,
  initialValues,
  onSubmit,
  submitButtonText = 'Save',
  onCancel
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, () => setFormData(initialValues));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl mb-6 border border-gray-200 dark:border-gray-800">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={field.colSpan === 2 ? 'col-span-2' : 'col-span-1'}>
            <label className="block text-sm mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select
                required={field.required}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 bg-transparent"
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                <option value="">Select...</option>
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                required={field.required}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 bg-transparent"
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
        <div className="col-span-2 flex justify-end gap-3 mt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 rounded transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded transition-colors"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
