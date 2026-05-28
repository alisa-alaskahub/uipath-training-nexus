'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Vendors' },
  { label: 'Upload Transactions' },
];

export default function VendorUploadPage() {
  const [vendorName, setVendorName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confirmedVendor, setConfirmedVendor] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setConfirmedVendor(vendorName);
    setSubmitted(true);
  }

  function handleCancel() {
    setVendorName('');
    setSubmitted(false);
    setConfirmedVendor('');
  }

  function handleSubmitNext() {
    setVendorName('');
    setSubmitted(false);
    setConfirmedVendor('');
  }

  const inputClass =
    'w-full h-10 px-3 border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <>
      <Navbar active="vendors" breadcrumbs={breadcrumbs} />
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">
        <div className="mb-6">
          <h1 id="page-title" className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Upload Vendor Transactions
          </h1>
          <p id="page-subtitle" className="text-slate-600">
            Submit filtered transaction file for a vendor.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">

          {/* Upload form */}
          {!submitted && (
            <div
              id="vendor-upload-form-card"
              className="bg-white border border-slate-200 p-6"
              style={{ borderRadius: '2px' }}
            >
              <form
                id="vendor-upload-form"
                data-testid="vendor-upload-form"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label htmlFor="vendor-name" className={labelClass}>
                    Vendor Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="vendor-name"
                    name="vendor-name"
                    data-testid="input-vendor-name"
                    placeholder="Enter vendor name"
                    required
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className={inputClass}
                    style={{ borderRadius: '2px' }}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="vendor-file" className={labelClass}>
                    Transaction File <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="vendor-file"
                    name="vendor-file"
                    data-testid="input-vendor-file"
                    accept=".xlsx,.csv"
                    required
                    className="w-full text-sm text-slate-600 border border-slate-300 bg-white
                      file:mr-3 file:h-8 file:border-0 file:border-r file:border-slate-300
                      file:bg-slate-50 file:px-3 file:text-sm file:text-slate-600
                      file:cursor-pointer cursor-pointer
                      focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                    style={{ borderRadius: '2px', height: '40px', lineHeight: '40px' }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    id="submit-vendor-upload"
                    data-testid="submit-vendor-upload"
                    className="h-10 px-6 bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    Upload Transactions
                  </button>
                  <button
                    type="button"
                    id="cancel-vendor-upload"
                    data-testid="cancel-vendor-upload"
                    onClick={handleCancel}
                    className="h-10 px-6 border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Success screen */}
          {submitted && (
            <div
              id="upload-success"
              data-testid="upload-success"
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

              <h2
                id="upload-success-heading"
                className="text-2xl font-bold text-slate-900 text-center mb-2"
              >
                Upload Successful
              </h2>
              <p
                id="upload-success-message"
                data-testid="upload-success-message"
                className="text-slate-600 text-center text-sm mb-6"
              >
                Transactions file uploaded successfully for vendor:{' '}
                <span id="upload-vendor-name" data-testid="upload-vendor-name" className="font-semibold text-slate-900">
                  {confirmedVendor}
                </span>
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="submit-next-vendor"
                  data-testid="submit-next-vendor"
                  onClick={handleSubmitNext}
                  className="flex-1 h-10 bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors flex items-center justify-center"
                  style={{ borderRadius: '2px' }}
                >
                  Submit Next One
                </button>
                <Link
                  id="back-home-vendor"
                  data-testid="back-home-vendor"
                  href="/"
                  className="flex-1 h-10 border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center"
                  style={{ borderRadius: '2px' }}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
