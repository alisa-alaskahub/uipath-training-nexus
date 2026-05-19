import Link from 'next/link';

const NAV_LINKS = [
  { id: 'nav-home', href: '/', label: 'Home', key: 'home' },
  { id: 'nav-products', href: '/products', label: 'Products', key: 'products' },
  { id: 'nav-orders', href: '/orders', label: 'Orders', key: 'orders' },
  { id: 'nav-employees', href: '/employees/new', label: 'Employees', key: 'employees' },
  { id: 'nav-tickets', href: '/tickets', label: 'Tickets', key: 'tickets' },
];

export default function Navbar({ active, breadcrumbs = [] }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav
        id="main-nav"
        data-testid="main-nav"
        className="bg-white border-b-2 border-blue-700 h-16"
        style={{ height: '64px' }}
      >
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              id="nav-logo"
              className="w-7 h-7 bg-blue-700 flex items-center justify-center"
              style={{ borderRadius: '2px' }}
            >
              <span className="text-white text-sm font-bold leading-none">N</span>
            </div>
            <span className="text-slate-900 font-bold text-lg tracking-tight select-none">NEXUS</span>
          </div>

          <div className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                id={link.id}
                href={link.href}
                data-testid={link.id}
                className={[
                  'px-4 py-2 text-sm transition-colors',
                  active === link.key
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                ].join(' ')}
                style={{ borderRadius: '2px' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-slate-500">Signed in as</span>
            <span id="nav-user-email" className="text-slate-900 font-bold">
              alisa@nexus.com
            </span>
          </div>
        </div>
      </nav>

      {breadcrumbs.length > 0 && (
        <div
          id="breadcrumb-bar"
          data-testid="breadcrumb-bar"
          className="bg-white border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-8 py-2.5">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center gap-1">
                    {index > 0 && <span className="text-slate-300 select-none">/</span>}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-slate-700 font-medium">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
