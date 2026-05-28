import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { orders } from '@/lib/orders';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Orders' },
];

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

export default function OrdersPage() {
  return (
    <>
      <Navbar active="orders" breadcrumbs={breadcrumbs} />
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">

        <div className="mb-6">
          <h1 id="page-title" className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Orders
          </h1>
          <p id="page-subtitle" className="text-slate-600">
            Manage and process customer orders.
          </p>
        </div>

        <div
          id="orders-table-container"
          className="bg-white border border-slate-200 overflow-hidden"
          style={{ borderRadius: '2px' }}
        >
          {/* Toolbar */}
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center">
            <span
              id="orders-count"
              data-testid="orders-count"
              className="text-sm font-semibold text-slate-900"
            >
              {orders.length} orders
            </span>
          </div>

          {/* Table */}
          <table
            id="orders-table"
            data-testid="orders-table"
            className="w-full border-collapse"
          >
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  id={`order-row-${order.id}`}
                  data-testid={`order-row-${order.id}`}
                  data-order-id={order.id}
                  data-status={order.status}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <span
                      id={`order-id-${order.id}`}
                      data-testid={`order-id-${order.id}`}
                      className="font-mono text-sm font-medium text-slate-900"
                    >
                      {order.id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      id={`customer-${order.id}`}
                      data-testid={`customer-${order.id}`}
                      className="text-sm text-slate-900"
                    >
                      {order.customer}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      id={`status-${order.id}`}
                      data-testid={`status-${order.id}`}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                      style={{ borderRadius: '2px' }}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[order.status]}`} />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/orders/${order.id}`}
                      id={`view-order-${order.id}`}
                      data-testid={`view-order-${order.id}`}
                      className="text-xs font-semibold text-blue-700 hover:underline tracking-wide"
                    >
                      VIEW
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </>
  );
}
