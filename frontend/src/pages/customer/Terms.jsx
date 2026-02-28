import { Link } from 'react-router-dom';
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale } from 'lucide-react';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using ShopNow ("we", "us", "our"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you may not use our services. These terms apply to all visitors, customers, and others who access or use the service.',
  },
  {
    title: '2. Eligibility',
    content: 'You must be at least 18 years old to create an account or make purchases on ShopNow. By using our service, you represent that you are at least 18 years of age, have the legal capacity to enter into these terms, and are not prohibited from using the service under applicable law.',
  },
  {
    title: '3. Account Responsibilities',
    content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorised use of your account. ShopNow is not liable for any loss resulting from unauthorised access to your account. You may not use another person\'s account without permission.',
  },
  {
    title: '4. Products and Pricing',
    content: 'We reserve the right to modify product descriptions, images, prices, and availability at any time without notice. Prices are displayed in USD unless otherwise stated. We make every effort to ensure product information is accurate, but we do not guarantee that descriptions or prices are error-free. In the event of a pricing error, we reserve the right to cancel affected orders with a full refund.',
  },
  {
    title: '5. Orders and Payment',
    content: 'Placing an order constitutes an offer to purchase. Orders are confirmed only upon receipt of our acceptance email. We reserve the right to refuse or cancel any order for reasons including product unavailability, pricing errors, or suspected fraud. Payment must be received in full before orders are dispatched. We accept major credit cards, PayPal, and other methods displayed at checkout.',
  },
  {
    title: '6. Shipping and Delivery',
    content: 'Delivery times are estimates only and not guaranteed. Risk of loss and title pass to you upon delivery to the carrier. We are not liable for delays caused by third-party carriers, customs processing, weather, or events beyond our control. Customers are responsible for any customs duties, taxes, or fees imposed by their country for international orders.',
  },
  {
    title: '7. Returns and Refunds',
    content: 'Our return policy allows returns within 30 days of delivery for items in original, unused condition. Items must be returned in original packaging. We reserve the right to deny returns that do not meet these conditions. Refunds are issued to the original payment method. We do not refund shipping costs unless the return is due to our error.',
  },
  {
    title: '8. Intellectual Property',
    content: 'All content on ShopNow, including but not limited to text, graphics, logos, icons, images, and software, is the exclusive property of ShopNow or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
  },
  {
    title: '9. Prohibited Conduct',
    content: 'You agree not to: (a) use the service for any unlawful purpose; (b) attempt to gain unauthorised access to any part of the service; (c) submit false or misleading information; (d) upload malicious code or interfere with the service\'s functionality; (e) engage in fraudulent activity, including submitting false returns or chargebacks; (f) harass, abuse, or harm other users or our staff.',
  },
  {
    title: '10. Limitation of Liability',
    content: 'To the maximum extent permitted by law, ShopNow shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service. Our total liability for any claim arising from your use of the service shall not exceed the amount you paid to us in the 12 months preceding the claim.',
  },
  {
    title: '11. Governing Law',
    content: 'These Terms of Service are governed by the laws of the State of New York, United States, without regard to conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in New York County, New York.',
  },
  {
    title: '12. Changes to Terms',
    content: 'We reserve the right to modify these terms at any time. Changes will be effective upon posting to our website. We will provide notice of significant changes via email or a prominent notice on our website. Continued use of our service after changes constitutes acceptance of the updated terms.',
  },
];

export default function Terms() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-14 px-4 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20">
          <FileText className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-3">Terms of Service</h1>
        <p className="text-gray-400 max-w-xl mx-auto">Please read these terms carefully before using ShopNow. By using our services, you agree to be bound by these terms.</p>
        <p className="text-gray-500 text-sm mt-4">Effective Date: January 15, 2025 · Version 3.0</p>
      </section>

      {/* Key points */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="font-black text-gray-900 text-center mb-5">Key Points Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-bold text-green-800 text-sm mb-1">What You Can Do</p>
              <ul className="text-xs text-green-700 space-y-1">
                <li>• Browse and purchase products</li>
                <li>• Create and manage your account</li>
                <li>• Leave honest product reviews</li>
                <li>• Return items within 30 days</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <XCircle className="w-6 h-6 text-red-600 mb-2" />
              <p className="font-bold text-red-800 text-sm mb-1">What You Cannot Do</p>
              <ul className="text-xs text-red-700 space-y-1">
                <li>• Commit fraud or abuse returns</li>
                <li>• Copy our intellectual property</li>
                <li>• Hack or disrupt our systems</li>
                <li>• Use the service if under 18</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 mb-2" />
              <p className="font-bold text-amber-800 text-sm mb-1">Good to Know</p>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• Prices can change without notice</li>
                <li>• Orders need our confirmation</li>
                <li>• Liability is limited by law</li>
                <li>• Terms may be updated over time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Full terms */}
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        {sections.map(({ title, content }) => (
          <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-black text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0">
                {title.split('.')[0]}
              </span>
              {title.split('. ')[1]}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Scale className="w-10 h-10 flex-shrink-0 opacity-70" />
          <div className="flex-1">
            <h3 className="font-black text-lg">Legal Questions?</h3>
            <p className="text-gray-300 text-sm">Contact our legal team at <strong>legal@shopnow.com</strong> for any questions about these terms.</p>
          </div>
          <Link to="/contact" className="bg-white text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors whitespace-nowrap flex-shrink-0">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
