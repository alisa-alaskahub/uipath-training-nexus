'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Products' },
];

const IMG = {
  Monitors:    'https://placehold.co/160x120/dbeafe/1e40af?text=Monitor',
  Keyboards:   'https://placehold.co/160x120/ede9fe/5b21b6?text=Keyboard',
  Mice:        'https://placehold.co/160x120/dcfce7/166534?text=Mouse',
  Printers:    'https://placehold.co/160x120/ffedd5/9a3412?text=Printer',
  Networking:  'https://placehold.co/160x120/cffafe/155e75?text=Networking',
  Storage:     'https://placehold.co/160x120/fef9c3/854d0e?text=Storage',
  Audio:       'https://placehold.co/160x120/fce7f3/831843?text=Audio',
  Accessories: 'https://placehold.co/160x120/f1f5f9/334155?text=Accessory',
};

const PRODUCTS = [
  { id: 1,  name: 'Dell UltraSharp 27" 4K Monitor',       model: 'DELL-U2723QE',    category: 'Monitors',    price: 2399, status: 'In Stock',     manufacturer: 'Dell',        specs: '27" IPS · 3840×2160 · 60 Hz' },
  { id: 2,  name: 'LG 32UN880 UltraFine Display',          model: 'LG-32UN880-B',    category: 'Monitors',    price: 3499, status: 'In Stock',     manufacturer: 'LG',          specs: '32" Nano IPS · 3840×2160 · 350 cd/m²' },
  { id: 3,  name: 'BenQ PD2700U Designer Monitor',         model: 'BNQ-PD2700U',     category: 'Monitors',    price: 2199, status: 'Out of Stock', manufacturer: 'BenQ',        specs: '27" IPS · 3840×2160 · 100% sRGB' },
  { id: 4,  name: 'Acer SB220Q 21.5" Full HD Monitor',     model: 'ACR-SB220Q-BI',   category: 'Monitors',    price: 699,  status: 'In Stock',     manufacturer: 'Acer',        specs: '21.5" IPS · 1920×1080 · 75 Hz' },
  { id: 5,  name: 'Logitech MX Keys Advanced Keyboard',    model: 'LGT-MX-KEYS',     category: 'Keyboards',   price: 499,  status: 'In Stock',     manufacturer: 'Logitech',    specs: 'Low-profile · Full-size · Bluetooth / USB · White LED' },
  { id: 6,  name: 'Das Keyboard 4 Professional',           model: 'DKBD-4-PRO',      category: 'Keyboards',   price: 699,  status: 'Out of Stock', manufacturer: 'Das Keyboard', specs: 'Cherry MX Blue · Full-size · USB' },
  { id: 7,  name: 'Keychron K2 Wireless Mechanical',       model: 'KCH-K2-WL-RGB',   category: 'Keyboards',   price: 399,  status: 'Out of Stock', manufacturer: 'Keychron',    specs: 'Gateron G Pro · 75% · Bluetooth / USB · RGB' },
  { id: 8,  name: 'Logitech MX Master 3S Mouse',           model: 'LGT-MX-M3S',      category: 'Mice',        price: 389,  status: 'In Stock',     manufacturer: 'Logitech',    specs: 'Darkfield sensor · 200–8000 DPI · Bluetooth / USB · 7 buttons' },
  { id: 9,  name: 'Razer DeathAdder V3 Gaming Mouse',      model: 'RZR-DA-V3-BLK',   category: 'Mice',        price: 279,  status: 'In Stock',     manufacturer: 'Razer',       specs: 'Focus Pro 30K · 100–30000 DPI · USB · 6 buttons' },
  { id: 10, name: 'Kensington Expert Mouse Trackball',     model: 'KEN-EXP-MOUSE',   category: 'Mice',        price: 399,  status: 'In Stock',     manufacturer: 'Kensington',  specs: 'Trackball · 400–1200 DPI · Bluetooth / USB · 4 buttons' },
  { id: 11, name: 'HP LaserJet Pro M404dn',                model: 'HP-LJ-M404DN',    category: 'Printers',    price: 1299, status: 'In Stock',     manufacturer: 'HP',          specs: 'Laser Mono · 38 ppm · 1200 dpi · Ethernet / USB' },
  { id: 12, name: 'Brother HL-L3270CDW Color Laser',       model: 'BRO-HLL3270CDW',  category: 'Printers',    price: 1799, status: 'Out of Stock', manufacturer: 'Brother',     specs: 'Laser Color · 25 ppm · 2400 dpi · Wi-Fi / Ethernet' },
  { id: 13, name: 'Cisco SG350-10 Managed Switch',         model: 'CSC-SG350-10P',   category: 'Networking',  price: 1599, status: 'In Stock',     manufacturer: 'Cisco',       specs: '8× Gigabit · 1 Gbps · Managed (Web/CLI)' },
  { id: 14, name: 'TP-Link TL-SG1016D Gigabit Switch',     model: 'TPL-SG1016D',     category: 'Networking',  price: 299,  status: 'In Stock',     manufacturer: 'TP-Link',     specs: '16× Gigabit · 1 Gbps · Unmanaged · 32 Gbps backplane' },
  { id: 15, name: 'Ubiquiti UniFi AP-AC-LR Access Point',  model: 'UBQ-UAP-AC-LR',   category: 'Networking',  price: 799,  status: 'Out of Stock', manufacturer: 'Ubiquiti',    specs: '802.11ac · 2.4/5 GHz · 867 Mbps · Long-range' },
  { id: 16, name: 'Samsung 870 EVO 1TB SSD',               model: 'SAM-870EVO-1TB',  category: 'Storage',     price: 399,  status: 'In Stock',     manufacturer: 'Samsung',     specs: 'SSD 2.5" · SATA III · 1 TB · 560 MB/s read' },
  { id: 17, name: 'WD My Passport 4TB Portable Drive',     model: 'WD-PASS-4TB-BLK', category: 'Storage',     price: 349,  status: 'In Stock',     manufacturer: 'Western Digital', specs: 'HDD Portable · USB 3.0 · 4 TB · 130 MB/s write' },
  { id: 18, name: 'Seagate IronWolf 8TB NAS Drive',        model: 'SEA-IW-8TB-NAS',  category: 'Storage',     price: 799,  status: 'In Stock',     manufacturer: 'Seagate',     specs: 'HDD 3.5" NAS · SATA III · 8 TB · 7200 RPM' },
  { id: 19, name: 'Jabra Evolve2 55 UC Headset',           model: 'JAB-EV2-55-UC',   category: 'Audio',       price: 1199, status: 'In Stock',     manufacturer: 'Jabra',       specs: 'On-ear · Bluetooth / USB · ANC · 36 h battery' },
  { id: 20, name: 'Sony WH-1000XM5 Wireless Headphones',   model: 'SNY-WH1000XM5',   category: 'Audio',       price: 1299, status: 'Out of Stock', manufacturer: 'Sony',        specs: 'Over-ear · Bluetooth · ANC · 30 h battery' },
  { id: 21, name: 'Plantronics Voyager Focus 2 Headset',   model: 'PLT-VYG-FC2-UC',  category: 'Audio',       price: 899,  status: 'In Stock',     manufacturer: 'Plantronics', specs: 'On-ear · Bluetooth / USB · ANC · 19 h battery' },
  { id: 22, name: 'Belkin USB-C Hub 7-in-1',               model: 'BLK-HUB-7IN1-C',  category: 'Accessories', price: 249,  status: 'In Stock',     manufacturer: 'Belkin',      specs: '7-in-1 · 100W PD · HDMI 4K · 3× USB-A' },
  { id: 23, name: 'StarTech Dual Monitor Stand',           model: 'STC-DMON-STD-S',  category: 'Accessories', price: 399,  status: 'Out of Stock', manufacturer: 'StarTech',    specs: 'Dual Arm · VESA 75×75/100×100 · 40 cm reach · 2×9 kg max' },
  { id: 24, name: 'Logitech C920 HD Pro Webcam',           model: 'LGT-C920-PRO',    category: 'Accessories', price: 329,  status: 'In Stock',     manufacturer: 'Logitech',    specs: '1080p / 30fps · Autofocus · USB' },
  { id: 25, name: 'Anker PowerConf C300 Smart Webcam',     model: 'ANK-PWC-C300',    category: 'Accessories', price: 399,  status: 'In Stock',     manufacturer: 'Anker',       specs: '1080p / 60fps · AI Autofocus · 65°–95° FOV' },
];

const PAGE_SIZE = 5;

function formatPrice(price) {
  return price.toLocaleString('pl-PL') + ' PLN';
}

export default function ProductsPage() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stockFilter, setStockFilter] = useState('All');
  const [applied, setApplied] = useState({ minPrice: '', maxPrice: '', stock: 'All' });
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (applied.minPrice !== '' && p.price < Number(applied.minPrice)) return false;
      if (applied.maxPrice !== '' && p.price > Number(applied.maxPrice)) return false;
      if (applied.stock !== 'All' && p.status !== applied.stock) return false;
      return true;
    });
  }, [applied]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearch(e) {
    e.preventDefault();
    setApplied({ minPrice, maxPrice, stock: stockFilter });
    setCurrentPage(1);
  }

  function handleReset() {
    setMinPrice('');
    setMaxPrice('');
    setStockFilter('All');
    setApplied({ minPrice: '', maxPrice: '', stock: 'All' });
    setCurrentPage(1);
  }

  function goToPage(page) {
    setCurrentPage(Math.max(1, Math.min(totalPages, page)));
  }

  const inputClass =
    'w-full h-10 px-3 border border-slate-300 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white';

  return (
    <>
      <Navbar active="products" breadcrumbs={breadcrumbs} />
      <main className="max-w-7xl mx-auto px-8 pt-28 pb-16">

        {/* Page header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 id="page-title" className="text-3xl font-bold text-slate-900 tracking-tight mb-1">
              Product Catalog
            </h1>
            <p id="page-subtitle" className="text-slate-600 text-sm">
              Browse and filter inventory across all categories.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Total SKUs</p>
            <p id="total-skus" data-testid="total-skus" className="font-mono font-bold text-2xl text-slate-900">
              2,847
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div id="filter-bar" className="bg-white border border-slate-200 p-5 mb-4" style={{ borderRadius: '2px' }}>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">FILTER CATALOG</p>
          <form id="filter-form" data-testid="filter-form" onSubmit={handleSearch}>
            <div className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-3">
                <label htmlFor="min-price" className="block text-xs font-medium text-slate-600 mb-1">Min Price (PLN)</label>
                <input
                  type="number" id="min-price" name="min-price" data-testid="filter-min-price"
                  value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0" min="0" className={inputClass} style={{ borderRadius: '2px' }}
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="max-price" className="block text-xs font-medium text-slate-600 mb-1">Max Price (PLN)</label>
                <input
                  type="number" id="max-price" name="max-price" data-testid="filter-max-price"
                  value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="9999" min="0" className={inputClass} style={{ borderRadius: '2px' }}
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="stock-filter" className="block text-xs font-medium text-slate-600 mb-1">Stock Status</label>
                <select
                  id="stock-filter" name="stock-filter" data-testid="filter-stock"
                  value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}
                  className={inputClass} style={{ borderRadius: '2px' }}
                >
                  <option value="All">All</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="col-span-3 flex gap-2">
                <button type="submit" id="search-btn" data-testid="search-btn"
                  className="flex-1 h-10 bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition-colors"
                  style={{ borderRadius: '2px' }}>
                  Search
                </button>
                <button type="button" id="reset-btn" data-testid="reset-btn" onClick={handleReset}
                  className="flex-1 h-10 border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                  style={{ borderRadius: '2px' }}>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span id="results-count" data-testid="results-count" className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span> products
          </span>
        </div>

        {/* Product cards */}
        <div id="products-catalog" data-testid="products-catalog" className="flex flex-col gap-3">
          {paginated.length === 0 ? (
            <div id="no-results" className="bg-white border border-slate-200 px-6 py-12 text-center text-sm text-slate-500" style={{ borderRadius: '2px' }}>
              No products match the current filters.
            </div>
          ) : (
            paginated.map((product) => (
              <div
                key={product.id}
                id={`product-row-${product.id}`}
                data-testid={`product-row-${product.id}`}
                className="bg-white border border-slate-200 flex overflow-hidden hover:border-slate-300 transition-colors"
                style={{ borderRadius: '2px' }}
              >
                {/* Product image */}
                <div className="w-44 shrink-0 bg-slate-50 border-r border-slate-100 flex items-center justify-center p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG[product.category]}
                    alt={product.name}
                    width={160}
                    height={120}
                    className="object-contain"
                    id={`product-img-${product.id}`}
                  />
                </div>

                {/* Product details */}
                <div className="flex-1 px-6 py-5">
                  <h3
                    id={`product-name-${product.id}`}
                    data-testid={`product-name-${product.id}`}
                    className="font-semibold text-slate-900 text-base mb-4 leading-snug"
                  >
                    {product.name}
                  </h3>

                  <dl className="flex flex-col gap-2">
                    <div className="flex items-baseline gap-3">
                      <dt className="text-xs text-slate-500 w-24 shrink-0">Model</dt>
                      <dd
                        id={`product-model-${product.id}`}
                        data-testid={`product-model-${product.id}`}
                        className="font-mono text-xs text-slate-700"
                      >
                        {product.model}
                      </dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="text-xs text-slate-500 w-24 shrink-0">Manufacturer</dt>
                      <dd
                        id={`product-manufacturer-${product.id}`}
                        data-testid={`product-manufacturer-${product.id}`}
                        className="text-sm text-slate-800"
                      >
                        {product.manufacturer}
                      </dd>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <dt className="text-xs text-slate-500 w-24 shrink-0">Specs</dt>
                      <dd
                        id={`product-specs-${product.id}`}
                        data-testid={`product-specs-${product.id}`}
                        className="text-sm text-slate-700"
                      >
                        {product.specs}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Price + status column */}
                <div className="w-48 shrink-0 border-l border-slate-100 px-5 py-5 flex flex-col justify-between">
                  <div>
                    <span
                      id={`product-price-${product.id}`}
                      data-testid={`product-price-${product.id}`}
                      className="font-mono font-bold text-xl text-slate-900 block"
                    >
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">incl. VAT</span>
                  </div>

                  <div>
                    {product.status === 'In Stock' ? (
                      <span
                        id={`product-status-${product.id}`}
                        data-testid={`product-status-${product.id}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                        style={{ borderRadius: '2px' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        In Stock
                      </span>
                    ) : (
                      <span
                        id={`product-status-${product.id}`}
                        data-testid={`product-status-${product.id}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                        style={{ borderRadius: '2px' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Page{' '}
            <span id="current-page-num" className="font-mono font-bold">{currentPage}</span>
            {' '}of{' '}
            <span id="total-pages-num" className="font-mono font-bold">{totalPages}</span>
          </span>

          <div className="flex items-center gap-1">
            <button type="button" id="prev-page" data-testid="prev-page"
              onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
              className="h-8 px-3 border border-slate-300 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              style={{ borderRadius: '2px' }}>
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} type="button" id={`page-${page}`} data-testid={`page-${page}`}
                onClick={() => goToPage(page)}
                className={[
                  'h-8 w-8 text-sm transition-colors',
                  currentPage === page
                    ? 'bg-blue-700 text-white font-medium'
                    : 'border border-slate-300 text-slate-600 hover:bg-slate-100',
                ].join(' ')}
                style={{ borderRadius: '2px' }}>
                {page}
              </button>
            ))}

            <button type="button" id="next-page" data-testid="next-page"
              onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
              className="h-8 px-3 border border-slate-300 text-sm text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              style={{ borderRadius: '2px' }}>
              Next
            </button>
          </div>
        </div>

      </main>
    </>
  );
}
