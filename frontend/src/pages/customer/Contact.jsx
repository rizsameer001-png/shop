import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+1 800-SHOPNOW', sub: 'Mon–Fri, 9am–6pm EST', color: 'bg-blue-100 text-blue-600' },
  { icon: Mail, label: 'Email', value: 'support@shopnow.com', sub: 'We reply within 24 hours', color: 'bg-green-100 text-green-600' },
  { icon: MapPin, label: 'Office', value: '123 Commerce Ave, Suite 400', sub: 'New York, NY 10001', color: 'bg-purple-100 text-purple-600' },
  { icon: Clock, label: 'Hours', value: 'Monday – Friday', sub: '9:00 AM – 6:00 PM EST', color: 'bg-amber-100 text-amber-600' },
];

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3–7 business days. Express shipping is available at checkout for 1–2 business days.' },
  { q: 'What is your return policy?', a: 'We offer hassle-free 30-day returns on all items. Simply contact us and we\'ll arrange a free pickup.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can also view it in My Orders.' },
  { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. Contact support immediately.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', type: 'general' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate sending
    setLoading(false);
    setSent(true);
    toast.success('Message sent! We\'ll reply within 24 hours.');
  };

  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-700 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Get in Touch</h1>
          <p className="text-white/80 text-lg">Have a question, issue, or just want to say hello? We'd love to hear from you. Our team typically responds within a few hours.</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {contactInfo.map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="font-bold text-gray-900 text-sm">{value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">Thank you for reaching out. Our support team will reply to <strong>{form.email}</strong> within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '', type: 'general' }); }}
                  className="btn-primary px-8 py-3">Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Type selector */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">What can we help with?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[['general', '💬', 'General'], ['order', '📦', 'Order'], ['return', '↩️', 'Return'], ['tech', '🔧', 'Technical']].map(([val, emoji, label]) => (
                        <button type="button" key={val} onClick={() => setForm({ ...form, type: val })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all ${form.type === val ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                          {emoji} {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Your Name *</label>
                      <input {...f('name')} className="input mt-1" placeholder="John Doe" required />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                      <input {...f('email')} type="email" className="input mt-1" placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Subject *</label>
                    <input {...f('subject')} className="input mt-1" placeholder="How can we help you?" required />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Message *</label>
                    <textarea {...f('message')} rows={5} className="input mt-1 resize-none" placeholder="Describe your issue or question in detail..." required />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base font-bold">
                    <Send className="w-4 h-4" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live chat CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <HeadphonesIcon className="w-8 h-8 mb-3" />
            <h3 className="font-black text-lg mb-1">Live Chat Support</h3>
            <p className="text-white/80 text-sm mb-4">Talk to a real person right now. Average response time: under 2 minutes.</p>
            <button className="bg-white text-blue-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors w-full">
              Start Live Chat
            </button>
          </div>

          {/* FAQ quick answers */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" /> Quick Answers
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{faq.q}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
