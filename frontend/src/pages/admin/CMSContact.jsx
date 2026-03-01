import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Save, RotateCcw, Phone } from 'lucide-react';
import { getCMS, updateCMSSection, getCMSDefaults } from '../../utils/cmsStore';
import toast from 'react-hot-toast';

export default function CMSContact() {
  const [form, setForm] = useState(() => getCMS().contact);
  const [dirty, setDirty] = useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setDirty(true); };
  const f = (k) => ({ value: form[k] || '', onChange: e => set(k, e.target.value) });

  const save = () => { updateCMSSection('contact', form); setDirty(false); toast.success('Contact info saved!'); };
  const reset = () => { setForm(getCMSDefaults().contact); setDirty(true); };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link to="/admin/cms" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5"/></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Phone className="w-6 h-6 text-purple-600"/>Contact Info</h1>
          <p className="text-sm text-gray-500">Update info shown on the Contact page and in the nav top bar.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="btn-secondary flex items-center gap-2 text-sm"><RotateCcw className="w-4 h-4"/>Reset</button>
          <button onClick={save} disabled={!dirty} className="btn-primary flex items-center gap-2 text-sm"><Save className="w-4 h-4"/>Save</button>
        </div>
      </div>

      {dirty && <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-amber-800 text-sm font-medium">⚠️ Unsaved changes</div>}

      <div className="card p-6 space-y-5">
        {[['phone','Phone Number','+1 800-SHOPNOW'],['email','Email Address','support@shopnow.com'],['address','Office Address','123 Commerce Ave, Suite 400, New York, NY 10001'],['hours','Business Hours','Monday – Friday, 9AM – 6PM EST']].map(([k,l,p]) => (
          <div key={k}>
            <label className="text-sm font-semibold text-gray-700">{l}</label>
            <input {...f(k)} className="input mt-1" placeholder={p}/>
          </div>
        ))}

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-12 h-6 rounded-full transition-colors relative ${form.chatEnabled ? 'bg-purple-500' : 'bg-gray-200'}`}
              onClick={() => set('chatEnabled', !form.chatEnabled)}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.chatEnabled ? 'left-[26px]' : 'left-0.5'}`}/>
            </div>
            <span className="text-sm font-semibold text-gray-700">Show Live Chat button on Contact page</span>
          </label>
        </div>
      </div>

      <div className="card p-4 bg-purple-50 border border-purple-200">
        <p className="text-sm text-purple-800 font-medium">
          📝 <strong>Tip:</strong> The phone and email you enter here will also appear in the top navigation bar on desktop.
        </p>
      </div>
    </div>
  );
}
