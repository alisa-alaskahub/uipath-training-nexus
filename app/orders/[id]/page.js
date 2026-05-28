'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { orders } from '@/lib/orders';

const ERROR_ORDER_IDS = ['ORD-004', 'ORD-007'];

const STATUS_OPTIONS = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

const STATUS_STYLES = {
  Pending:   'bg-amber-50 text-amber-700 border border-amber-200',
  Shipped:   'bg-blue-50 text-blue-700 border border-blue-200',
  Delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Cancelled: 'bg-slate-100 text-slate-600 border border-slate-200',
};

const STATUS_DOT = {
  Pending:   'bg-amber-400',
  Shipped:   'bg-blue-700',
  Delivered: 'bg-emerald-500',
  Cancelled: 'bg-slate-400',
};

const labelClass = 'text-sm text-slate-500 w-36 shrink-0';
const valueClass = 'text-sm font-medium text-slate-900';

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);

  const [selectedStatus, setSelectedStatus] = useState(order?.status ?? 'Pending');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!order) {
    return (
      <>
        <Navbar
          active="orders"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Orders', href: '/orders' },
            { label: 'Not Found' },
          ]}
        />
        <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">
          <p className="text-slate-600 text-sm">Order not found.</p>
        </main>
      </>
    );
  }

  const isErrorOrder = ERROR_ORDER_IDS.includes(order.id);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Orders', href: '/orders' },
    { label: order.id },
  ];

  function handleSave(e) {
    e.preventDefault();
    setSaveSuccess(true);
  }

  return (
    <>
      <Navbar active="orders" breadcrumbs={breadcrumbs} />
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">

        {/* Back link */}
        <div className="mb-5">
          <Link
            id="back-to-orders"
            data-testid="back-to-orders"
            href="/orders"
            className="text-sm text-blue-700 font-medium hover:underline"
          >
            ← Back to Orders
          </Link>
        </div>

        {/* Detail card */}
        <div
          id="order-detail-card"
          className="max-w-2xl mx-auto bg-white border border-slate-200 p-6"
          style={{ borderRadius: '2px' }}
        >

          {/* Fields */}
          <dl className="flex flex-col gap-4 mb-6">
            <div className="flex items-baseline gap-4">
              <dt className={labelClass}>Order ID</dt>
              <dd>
                <span
                  id="detail-order-id"
                  data-testid="detail-order-id"
                  className="font-mono font-medium text-sm text-slate-900"
                >
                  {order.id}
                </span>
              </dd>
            </div>

            <div className="flex items-baseline gap-4">
              <dt className={labelClass}>Customer</dt>
              <dd>
                <span
                  id="detail-customer"
                  data-testid="detail-customer"
                  className={valueClass}
                >
                  {order.customer}
                </span>
              </dd>
            </div>

            <div className="flex items-baseline gap-4">
              <dt className={labelClass}>Product</dt>
              <dd>
                <span
                  id="detail-product"
                  data-testid="detail-product"
                  className={valueClass}
                >
                  {order.product}
                </span>
              </dd>
            </div>

            <div className="flex items-baseline gap-4">
              <dt className={labelClass}>Amount</dt>
              <dd>
                <span
                  id="detail-amount"
                  data-testid="detail-amount"
                  className="font-mono font-medium text-sm text-slate-900"
                >
                  {order.amount}
                </span>
              </dd>
            </div>

            <div className="flex items-baseline gap-4">
              <dt className={labelClass}>Delivery Address</dt>
              <dd>
                <span
                  id="detail-address"
                  data-testid="detail-address"
                  className={valueClass}
                >
                  {order.address}
                </span>
              </dd>
            </div>

            <div className="flex items-baseline gap-4">
              <dt className={labelClass}>Current Status</dt>
              <dd>
                <span
                  id="detail-current-status"
                  data-testid="detail-current-status"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                  style={{ borderRadius: '2px' }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[order.status]}`} />
                  {order.status}
                </span>
              </dd>
            </div>
          </dl>

          <div className="border-t border-slate-100" />

          {/* Error orders */}
          {isErrorOrder && (
            <div
              id="order-error-message"
              data-testid="order-error"
              className="mt-5 pl-3 border-l-2 border-red-400"
            >
              <p className="text-sm text-red-600">
                This order cannot be processed due to a system error. Please contact support.
              </p>
            </div>
          )}

          {/* Update status form */}
          {!isErrorOrder && (
            <div id="update-status-section" data-testid="update-status-section" className="mt-5">
              <form
                id="update-status-form"
                data-testid="update-status-form"
                onSubmit={handleSave}
              >
                <div className="mb-4">
                  <label
                    htmlFor="status-select"
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                  >
                    New Status
                  </label>
                  <select
                    id="status-select"
                    name="status-select"
                    data-testid="input-status-select"
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setSaveSuccess(false);
                    }}
                    className="w-full h-10 px-3 border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white"
                    style={{ borderRadius: '2px' }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    id="save-status"
                    data-testid="btn-save-status"
                    className="h-10 px-6 bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    Save Status
                  </button>
                  <Link
                    id="cancel-status"
                    data-testid="cancel-status"
                    href="/orders"
                    className="h-10 px-6 border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors inline-flex items-center justify-center"
                    style={{ borderRadius: '2px' }}
                  >
                    Cancel
                  </Link>
                </div>
              </form>

              {saveSuccess && (
                <div
                  id="save-success"
                  data-testid="save-success-message"
                  className="mt-4 pl-3 border-l-2 border-emerald-400"
                >
                  <p className="text-sm text-emerald-700 font-medium">
                    Status updated successfully.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
