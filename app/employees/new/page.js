'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Employees' },
  { label: 'Add Employee' },
];

const DEPARTMENTS = [
  { value: '', label: '-- Select --' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Operations', label: 'Operations' },
  { value: 'Finance', label: 'Finance' },
  { value: 'HR', label: 'HR' },
];

export default function AddEmployeePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    startDate: '',
    position: '',
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.dataset.field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const empId = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const encodedName = encodeURIComponent(`${form.firstName} ${form.lastName}`);
    router.push(`/employees/success?id=${empId}&name=${encodedName}`);
  }

  function handleCancel() {
    router.push('/');
  }

  const inputClass =
    'w-full h-10 px-3 border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <>
      <Navbar active="employees" breadcrumbs={breadcrumbs} />
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">
        <div className="mb-6">
          <h1 id="page-title" className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Add New Employee
          </h1>
          <p id="page-subtitle" className="text-slate-600">
            Register a new hire in the HR system.
          </p>
        </div>

        <div
          className="max-w-2xl bg-white border border-slate-200 p-6"
          style={{ borderRadius: '2px' }}
        >
          <form
            id="add-employee-form"
            data-testid="add-employee-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="first-name" className={labelClass}>
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  data-testid="input-first-name"
                  data-field="firstName"
                  required
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                />
              </div>
              <div>
                <label htmlFor="last-name" className={labelClass}>
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  data-testid="input-last-name"
                  data-field="lastName"
                  required
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                data-testid="input-email"
                data-field="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                style={{ borderRadius: '2px' }}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="department" className={labelClass}>
                Department <span className="text-red-500">*</span>
              </label>
              <select
                id="department"
                name="department"
                data-testid="input-department"
                data-field="department"
                required
                value={form.department}
                onChange={handleChange}
                className={inputClass}
                style={{ borderRadius: '2px' }}
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="start-date" className={labelClass}>
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="start-date"
                  name="start-date"
                  data-testid="input-start-date"
                  data-field="startDate"
                  placeholder="DD/MM/YYYY"
                  required
                  value={form.startDate}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                />
              </div>
              <div>
                <label htmlFor="position" className={labelClass}>
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  data-testid="input-position"
                  data-field="position"
                  required
                  value={form.position}
                  onChange={handleChange}
                  className={inputClass}
                  style={{ borderRadius: '2px' }}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                id="submit-employee"
                data-testid="submit-employee"
                className="h-10 px-6 bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors"
                style={{ borderRadius: '2px' }}
              >
                Add Employee
              </button>
              <button
                type="button"
                id="cancel-add"
                data-testid="cancel-add"
                onClick={handleCancel}
                className="h-10 px-6 border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                style={{ borderRadius: '2px' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
