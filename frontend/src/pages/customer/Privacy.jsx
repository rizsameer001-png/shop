import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database, Bell, Trash2, Mail } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: [
      { subtitle: 'Account Information', text: 'When you create an account, we collect your name, email address, and password (stored as a secure hash). You may optionally provide a phone number and profile photo.' },
      { subtitle: 'Order Information', text: 'When you make a purchase, we collect your billing address, shipping address, and payment method details. Full payment card numbers are never stored on our servers — they are securely handled by our payment processor.' },
      { subtitle: 'Usage Data', text: 'We automatically collect information about how you interact with our website, including pages visited, products viewed, search queries, device type, browser, operating system, and IP address.' },
      { subtitle: 'Cookies', text: 'We use cookies and similar technologies to remember your preferences, keep you logged in, and understand how our site is used. You can control cookies through your browser settings.' },
    ],
  },
  {
    icon: Database,
    title: 'How We Use Your Information',
    content: [
      { subtitle: 'Order Fulfilment', text: 'Your name, address, and order details are used to process, ship, and track your orders. We share necessary details with our logistics partners solely for this purpose.' },
      { subtitle: 'Account Management', text: 'Your account details allow you to log in, view your order history, save addresses, and manage your preferences.' },
      { subtitle: 'Customer Support', text: 'When you contact us, we use your information to identify your account and resolve your issue efficiently.' },
      { subtitle: 'Improving Our Services', text: 'Aggregated, anonymised usage data helps us understand what features work well, fix problems, and develop new functionality.' },
      { subtitle: 'Marketing (with consent)', text: 'If you opt in, we may send promotional emails about new products, sales, and offers. You can unsubscribe at any time.' },
    ],
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: [
      { subtitle: 'Encryption', text: 'All data transmitted between your browser and our servers is encrypted using TLS 1.3. Sensitive fields such as passwords are hashed using bcrypt and cannot be reversed.' },
      { subtitle: 'Access Controls', text: 'Only authorised employees who need your data to perform their job can access it. All access is logged and audited regularly.' },
      { subtitle: 'Payment Security', text: 'We are PCI-DSS compliant. Payment processing is handled by Stripe, a leading payment processor trusted by millions of businesses worldwide.' },
      { subtitle: 'Breach Notification', text: 'In the unlikely event of a data breach that affects your personal information, we will notify you within 72 hours as required by applicable law.' },
    ],
  },
  {
    icon: Bell,
    title: 'Sharing Your Information',
    content: [
      { subtitle: 'We Never Sell Your Data', text: 'We do not sell, rent, or trade your personal information to third parties for marketing purposes. Full stop.' },
      { subtitle: 'Service Providers', text: 'We share data with trusted service providers who help us operate: Stripe (payments), shipping carriers, email delivery services, and cloud hosting. They are contractually prohibited from using your data for any other purpose.' },
      { subtitle: 'Legal Requirements', text: 'We may disclose your information if required by law, court order, or to protect the rights, property, or safety of ShopNow, our customers, or the public.' },
    ],
  },
  {
    icon: Trash2,
    title: 'Your Rights & Choices',
    content: [
      { subtitle: 'Access & Portability', text: 'You can request a copy of all personal data we hold about you at any time by contacting support@shopnow.com.' },
      { subtitle: 'Correction', text: 'You can update most of your information directly through your account settings. For data you cannot change yourself, contact our support team.' },
      { subtitle: 'Deletion', text: 'You may request deletion of your account and associated data. We will process the request within 30 days. Note that we may retain order records as required for legal and tax purposes.' },
      { subtitle: 'Opt-Out of Marketing', text: 'Click "Unsubscribe" at the bottom of any marketing email, or go to Account Settings > Notifications and toggle off email marketing.' },
    ],
  },
];

export default function Privacy() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white py-14 px-4 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20">
          <Shield className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-3">Privacy Policy</h1>
        <p className="text-gray-400 max-w-xl mx-auto">We respect your privacy and are committed to protecting your personal data. This policy explains clearly what we collect, why, and how.</p>
        <p className="text-gray-500 text-sm mt-4">Last updated: January 15, 2025</p>
      </section>

      {/* Intro banner */}
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-3xl mx-auto px-4 py-5 text-center">
          <p className="text-blue-800 text-sm font-medium">
            <strong>Summary:</strong> We collect only what we need to run our service. We never sell your data. You can delete your account anytime. If you have questions, <Link to="/contact" className="underline font-bold">contact us</Link>.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        {sections.map(({ icon: Icon, title, content }) => (
          <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-lg font-black text-gray-900">{title}</h2>
            </div>
            <div className="p-6 space-y-5">
              {content.map(({ subtitle, text }) => (
                <div key={subtitle}>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{subtitle}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Cookies */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h2 className="text-lg font-black text-gray-900 mb-3">🍪 Cookie Policy</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">We use essential cookies (required for the site to function), preference cookies (to remember your settings), and analytics cookies (to understand site usage). We do not use advertising cookies.</p>
          <p className="text-sm text-gray-600 leading-relaxed">You can disable non-essential cookies in your browser settings at any time, though this may affect some site features.</p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <Mail className="w-10 h-10 flex-shrink-0 opacity-80" />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-black text-lg">Privacy Questions?</h3>
            <p className="text-white/80 text-sm">Contact our Data Protection Officer at <strong>privacy@shopnow.com</strong> or visit our contact page.</p>
          </div>
          <Link to="/contact" className="bg-white text-blue-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors whitespace-nowrap flex-shrink-0">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
