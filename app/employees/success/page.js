'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Employees' },
  { label: 'Success' },
];

function SuccessContent() {
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('id') || 'EMP-0000';
  const name = decodeURIComponent(searchParams.get('name') || '');

  return (
    <div className="max-w-2xl mx-auto">
      <div
        id="success-card"
        data-testid="success-card"
        className="bg-white border border-slate-200 p-8"
        style={{ borderRadius: '2px' }}
      >
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1
          id="success-heading"
          className="text-2xl font-bold text-slate-900 text-center mb-2"
        >
          Employee Added Successfully
        </h1>
        <p className="text-slate-600 text-center text-sm mb-6">
          The new employee has been registered in the system.
        </p>

        <div
          id="employee-info-box"
          className="bg-slate-50 border border-slate-200 p-4 mb-6"
          style={{ borderRadius: '2px' }}
        >
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-sm text-slate-500 w-28 shrink-0">Employee ID:</span>
            <span
              id="generated-employee-id"
              data-testid="generated-employee-id"
              className="font-mono font-bold text-lg text-slate-900 tracking-wide"
            >
              {employeeId}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 w-28 shrink-0">Name:</span>
            <span
              id="employee-name"
              data-testid="employee-name"
              className="font-medium text-slate-900"
            >
              {name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            id="add-another"
            data-testid="add-another"
            href="/employees/new"
            className="flex-1 h-10 bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors flex items-center justify-center"
            style={{ borderRadius: '2px' }}
          >
            Add Another
          </Link>
          <Link
            id="back-home"
            data-testid="back-home"
            href="/"
            className="flex-1 h-10 border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center"
            style={{ borderRadius: '2px' }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Navbar active="employees" breadcrumbs={breadcrumbs} />
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">
        <Suspense
          fallback={
            <div className="text-sm text-slate-500 text-center pt-16">Loading...</div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>
    </>
  );
}
