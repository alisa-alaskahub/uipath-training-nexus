import Link from 'next/link';
import Navbar from '@/components/Navbar';

const CARDS = [
  {
    id: 'card-products',
    title: 'Products',
    subtitle: 'Browse product catalog and inventory',
    href: '/products',
  },
  {
    id: 'card-orders',
    title: 'Orders',
    subtitle: 'Process and update customer orders',
    href: '/orders',
  },
  {
    id: 'card-employees',
    title: 'Employees',
    subtitle: 'Manage new hires and personnel',
    href: '/employees/new',
  },
  {
    id: 'card-tickets',
    title: 'Tickets',
    subtitle: 'Customer support and assignment',
    href: '/tickets',
  },
];

const breadcrumbs = [{ label: 'Home' }];

export default function HomePage() {
  return (
    <>
      <Navbar active="home" breadcrumbs={breadcrumbs} />
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">
        <div className="mb-8">
          <h1
            id="page-title"
            className="text-3xl font-bold text-slate-900 tracking-tight mb-2"
          >
            Nexus Operations Portal
          </h1>
          <p id="page-subtitle" className="text-slate-600">
            Internal portal for IT hardware distribution. Manage products, orders, employees, and
            support tickets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CARDS.map((card) => (
            <div
              key={card.id}
              id={card.id}
              data-testid={card.id}
              className="bg-white border border-slate-200 p-6 hover:border-blue-700 transition-colors"
              style={{ borderRadius: '2px' }}
            >
              <h2 className="text-base font-semibold text-slate-900 mb-1">{card.title}</h2>
              <p className="text-slate-600 text-sm mb-4">{card.subtitle}</p>
              <Link
                href={card.href}
                id={`${card.id}-link`}
                data-testid={`${card.id}-link`}
                className="text-blue-700 text-sm font-medium hover:underline"
              >
                Open →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
