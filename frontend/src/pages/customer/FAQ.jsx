import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Package, CreditCard, Truck, RotateCcw, ShieldCheck, User } from 'lucide-react';

const categories = [
  {
    icon: Truck, label: 'Shipping & Delivery', color: 'bg-blue-100 text-blue-600',
    faqs: [
      { q: 'How long does standard shipping take?', a: 'Standard shipping takes 3–7 business days within the US. International orders typically take 7–14 business days depending on destination.' },
      { q: 'Do you offer free shipping?', a: 'Yes! We offer free standard shipping on all orders over $50. For orders under $50, a flat $5.99 shipping fee applies.' },
      { q: 'Can I track my order?', a: 'Absolutely. Once your order ships, you\'ll receive an email with a tracking number. You can also find it in your account under "My Orders".' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to 50+ countries. International shipping rates and times vary by location and are calculated at checkout.' },
    ],
  },
  {
    icon: RotateCcw, label: 'Returns & Refunds', color: 'bg-green-100 text-green-600',
    faqs: [
      { q: 'What is your return policy?', a: 'We offer a no-questions-asked 30-day return policy on all items. Items must be in original condition with tags attached.' },
      { q: 'How do I start a return?', a: 'Log into your account, go to "My Orders", find the item, and click "Request Return". We\'ll arrange a free pickup within 2 business days.' },
      { q: 'How long do refunds take?', a: 'Refunds are processed within 2–3 business days of receiving the returned item. It may take an additional 3–5 days to appear on your statement.' },
      { q: 'Can I exchange an item?', a: 'Yes. During the return process, select "Exchange" instead of "Refund" and choose your replacement item. Exchanges are free.' },
    ],
  },
  {
    icon: CreditCard, label: 'Payments', color: 'bg-purple-100 text-purple-600',
    faqs: [
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and Shop Pay.' },
      { q: 'Is my payment information secure?', a: 'Yes. All transactions are encrypted with SSL and we\'re PCI-DSS compliant. We never store your full card number.' },
      { q: 'Can I pay in instalments?', a: 'Yes, we offer Buy Now Pay Later through Shop Pay Instalments for eligible orders over $35.' },
      { q: 'Why was my payment declined?', a: 'Common reasons include incorrect card details, insufficient funds, or your bank flagging it. Try again or contact your bank.' },
    ],
  },
  {
    icon: Package, label: 'Orders', color: 'bg-amber-100 text-amber-600',
    faqs: [
      { q: 'Can I modify my order after placing it?', a: 'Orders can be modified within 1 hour of placement. After that, the order enters processing and cannot be changed.' },
      { q: 'How do I cancel an order?', a: 'Go to "My Orders" and click "Cancel Order". Cancellations are possible within 1 hour. After shipment, you\'ll need to do a return.' },
      { q: 'What if my order arrives damaged?', a: 'Take a photo of the damage and contact us within 48 hours of delivery. We\'ll send a replacement immediately at no cost.' },
      { q: 'My order is missing items — what do I do?', a: 'Some orders ship in multiple packages. Check your tracking info first. If items are missing, contact support and we\'ll resolve it within 24 hours.' },
    ],
  },
  {
    icon: User, label: 'Account & Profile', color: 'bg-pink-100 text-pink-600',
    faqs: [
      { q: 'How do I create an account?', a: 'Click "Sign Up" in the top navigation, enter your name, email, and password. You\'ll receive a confirmation email instantly.' },
      { q: 'I forgot my password — what do I do?', a: 'Click "Login" then "Forgot Password". Enter your email and we\'ll send a reset link valid for 1 hour.' },
      { q: 'How do I update my address or details?', a: 'Log in and visit "My Profile". You can update your name, email, password, and saved addresses at any time.' },
      { q: 'Can I delete my account?', a: 'Yes. Contact our support team and we\'ll delete your account and all personal data within 30 days per our privacy policy.' },
    ],
  },
  {
    icon: ShieldCheck, label: 'Privacy & Security', color: 'bg-teal-100 text-teal-600',
    faqs: [
      { q: 'How do you use my personal data?', a: 'We only use your data to process orders, improve your experience, and send marketing if you opt in. We never sell your data.' },
      { q: 'Can I opt out of marketing emails?', a: 'Yes. Click "Unsubscribe" at the bottom of any email, or visit your account settings and toggle off marketing communications.' },
      { q: 'Are my browsing and purchase habits tracked?', a: 'We use cookies to improve your experience and show relevant products. See our Privacy Policy for full details.' },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden transition-all ${open ? 'shadow-sm' : ''}`}>
      <button onClick={() => setOpen(o => !o)}
        className="w-full text-left flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-gray-900 text-sm pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = categories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(f => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())),
  })).filter(cat => {
    if (search) return cat.faqs.length > 0;
    if (activeCategory) return cat.label === activeCategory;
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Frequently Asked<br /><span className="text-yellow-300">Questions</span></h1>
          <p className="text-white/80 mb-8">Find quick answers to the most common questions about shipping, returns, payments, and more.</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg" />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Category filter */}
        {!search && (
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <button onClick={() => setActiveCategory(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${!activeCategory ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              All Topics
            </button>
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.label} onClick={() => setActiveCategory(cat.label === activeCategory ? null : cat.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${activeCategory === cat.label ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  <Icon className="w-4 h-4" /> {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* FAQ accordion sections */}
        {filtered.map(cat => {
          const Icon = cat.icon;
          return (
            <div key={cat.label} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black text-gray-900">{cat.label}</h2>
                <span className="text-xs text-gray-400 font-medium">({cat.faqs.length} questions)</span>
              </div>
              <div className="space-y-2">
                {cat.faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
              </div>
            </div>
          );
        })}

        {filtered.every(c => c.faqs.length === 0) && (
          <div className="text-center py-16 text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="font-bold text-gray-700 mb-2">No results for "{search}"</p>
            <p className="text-sm">Try different keywords or <Link to="/contact" className="text-blue-600 font-semibold">contact us directly</Link>.</p>
          </div>
        )}

        {/* Still need help */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
          <h3 className="text-xl font-black text-gray-900 mb-2">Still Have Questions?</h3>
          <p className="text-gray-500 text-sm mb-5">Our support team is available Monday–Friday, 9am–6pm EST.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
