'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Tickets' },
  { label: 'Create Ticket' },
];

const DEPARTMENTS = [
  { value: '',                  label: '-- Select --' },
  { value: 'Operations',        label: 'Operations' },
  { value: 'Logistics',         label: 'Logistics' },
  { value: 'Finance',           label: 'Finance' },
  { value: 'IT Support',        label: 'IT Support' },
  { value: 'Customer Service',  label: 'Customer Service' },
];

const inputClass =
  'w-full h-10 px-3 border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white';
const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

export default function TicketsPage() {
  const [orderId, setOrderId]         = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment]   = useState('');
  const [submitted, setSubmitted]     = useState(false);
  const [ticketId, setTicketId]       = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const generated = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generated);
    setConfirmedOrderId(orderId);
    setSubmitted(true);
  }

  function handleReset() {
    setOrderId('');
    setDescription('');
    setDepartment('');
    setTicketId('');
    setConfirmedOrderId('');
    setSubmitted(false);
  }

  return (
    <>
      <Navbar active="tickets" breadcrumbs={breadcrumbs} />
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">

        <div className="mb-6">
          <h1 id="page-title" className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Create Support Ticket
          </h1>
          <p id="page-subtitle" className="text-slate-600">
            Log a new support ticket for a failed or incomplete order.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">

          {/* Form */}
          {!submitted && (
            <div
              id="ticket-form-card"
              className="bg-white border border-slate-200 p-6"
              style={{ borderRadius: '2px' }}
            >
              <form
                id="create-ticket-form"
                data-testid="create-ticket-form"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label htmlFor="ticket-order-id" className={labelClass}>
                    Order ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ticket-order-id"
                    name="ticket-order-id"
                    data-testid="input-ticket-order-id"
                    placeholder="e.g. ORD-001"
                    required
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className={inputClass}
                    style={{ borderRadius: '2px' }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="ticket-description" className={labelClass}>
                    Issue Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="ticket-description"
                    name="ticket-description"
                    data-testid="input-ticket-description"
                    placeholder="Describe the issue..."
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white resize-none"
                    style={{ borderRadius: '2px' }}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="ticket-department" className={labelClass}>
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ticket-department"
                    name="ticket-department"
                    data-testid="input-ticket-department"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className={inputClass}
                    style={{ borderRadius: '2px' }}
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    id="submit-ticket"
                    data-testid="btn-submit-ticket"
                    className="h-10 px-6 bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    Create Ticket
                  </button>
                  <Link
                    id="cancel-ticket"
                    data-testid="cancel-ticket"
                    href="/"
                    className="h-10 px-6 border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors inline-flex items-center justify-center"
                    style={{ borderRadius: '2px' }}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          )}

          {/* Success screen */}
          {submitted && (
            <div
              id="ticket-success-card"
              data-testid="ticket-success-card"
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
                id="ticket-success-heading"
                data-testid="ticket-success-heading"
                className="text-2xl font-bold text-slate-900 text-center mb-2"
              >
                Ticket Created Successfully
              </h2>
              <p className="text-slate-600 text-center text-sm mb-6">
                Your support ticket has been logged.
              </p>

              <div
                id="ticket-info-box"
                className="bg-slate-50 border border-slate-200 p-4 mb-6"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-sm text-slate-500 w-24 shrink-0">Ticket ID:</span>
                  <span
                    id="generated-ticket-id"
                    data-testid="generated-ticket-id"
                    className="font-mono font-bold text-lg text-slate-900 tracking-wide"
                  >
                    {ticketId}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 w-24 shrink-0">Order ID:</span>
                  <span
                    id="ticket-success-order-id"
                    data-testid="ticket-success-order-id"
                    className="font-medium text-slate-900"
                  >
                    {confirmedOrderId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="create-another-ticket"
                  data-testid="btn-create-another"
                  onClick={handleReset}
                  className="flex-1 h-10 bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  Create Another Ticket
                </button>
                <Link
                  id="back-home-ticket"
                  data-testid="back-home-ticket"
                  href="/"
                  className="flex-1 h-10 border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors inline-flex items-center justify-center"
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
