import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Save, RotateCcw, Plus, Trash2, FileText } from 'lucide-react';
import { getCMS, updateCMSSection, getCMSDefaults } from '../../utils/cmsStore';
import toast from 'react-hot-toast';

const avatarColors = ['from-orange-400 to-red-500','from-blue-400 to-indigo-500','from-pink-400 to-rose-500','from-emerald-400 to-teal-500','from-purple-400 to-violet-500','from-amber-400 to-orange-500'];

export default function CMSAbout() {
  const [about, setAbout] = useState(() => getCMS().about);
  const [dirty, setDirty] = useState(false);

  const set = (k, v) => { setAbout(a => ({ ...a, [k]: v })); setDirty(true); };

  const setTeam = (idx, k, v) => {
    const updated = about.team.map((m, i) => i === idx ? { ...m, [k]: v } : m);
    set('team', updated);
  };
  const addTeamMember = () => set('team', [...about.team, { name: 'New Member', role: 'Role', avatar: 'NM', bio: 'Bio here.', color: avatarColors[0] }]);
  const removeTeamMember = (idx) => set('team', about.team.filter((_, i) => i !== idx));

  const setMilestone = (idx, k, v) => {
    const updated = about.milestones.map((m, i) => i === idx ? { ...m, [k]: v } : m);
    set('milestones', updated);
  };
  const addMilestone = () => set('milestones', [...about.milestones, { year: '2025', event: 'New Milestone', desc: 'Description here.' }]);
  const removeMilestone = (idx) => set('milestones', about.milestones.filter((_, i) => i !== idx));

  const setStat = (idx, k, v) => {
    const updated = about.stats.map((s, i) => i === idx ? { ...s, [k]: v } : s);
    set('stats', updated);
  };

  const save = () => { updateCMSSection('about', about); setDirty(false); toast.success('About page updated!'); };
  const reset = () => { setAbout(getCMSDefaults().about); setDirty(true); };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/admin/cms" className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5"/></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FileText className="w-6 h-6 text-green-600"/>About Page</h1>
          <p className="text-sm text-gray-500">Edit the content shown on /about</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset}   className="btn-secondary flex items-center gap-2 text-sm"><RotateCcw className="w-4 h-4"/>Reset</button>
          <button onClick={save} disabled={!dirty} className="btn-primary flex items-center gap-2 text-sm"><Save className="w-4 h-4"/>Save</button>
        </div>
      </div>

      {dirty && <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-amber-800 text-sm font-medium">⚠️ Unsaved changes</div>}

      {/* Hero text */}
      <div className="card p-6 space-y-4">
        <h2 className="font-bold text-gray-900">Hero Section</h2>
        <div>
          <label className="text-sm font-semibold text-gray-700">Hero Title</label>
          <input value={about.heroTitle} onChange={e => set('heroTitle', e.target.value)} className="input mt-1"/>
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Hero Subtitle</label>
          <textarea value={about.heroSubtitle} onChange={e => set('heroSubtitle', e.target.value)} className="input mt-1 resize-none h-20"/>
        </div>
      </div>

      {/* Company story */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-3">Company Story</h2>
        <textarea value={about.story} onChange={e => set('story', e.target.value)}
          className="input resize-none h-40 text-sm leading-relaxed"
          placeholder="Write your company story here. Use two newlines for paragraph breaks."/>
        <p className="text-xs text-gray-400 mt-1">Separate paragraphs with a blank line.</p>
      </div>

      {/* Stats */}
      <div className="card p-6">
        <h2 className="font-bold text-gray-900 mb-4">Stats Strip</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {about.stats?.map((stat, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-3 space-y-2">
              <input value={stat.value} onChange={e => setStat(idx,'value',e.target.value)}
                className="input text-center font-black text-blue-600 text-lg py-1" placeholder="50K+"/>
              <input value={stat.label} onChange={e => setStat(idx,'label',e.target.value)}
                className="input text-center text-xs py-1" placeholder="Customers"/>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Timeline / Milestones</h2>
          <button onClick={addMilestone} className="btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"><Plus className="w-3.5 h-3.5"/>Add</button>
        </div>
        {about.milestones?.map((m, idx) => (
          <div key={idx} className="border border-gray-200 rounded-xl p-4 grid grid-cols-[80px_1fr_1fr_auto] gap-3 items-center">
            <input value={m.year} onChange={e => setMilestone(idx,'year',e.target.value)} className="input font-black text-blue-600 text-center py-2" placeholder="2024"/>
            <input value={m.event} onChange={e => setMilestone(idx,'event',e.target.value)} className="input text-sm" placeholder="Milestone name"/>
            <input value={m.desc} onChange={e => setMilestone(idx,'desc',e.target.value)} className="input text-sm" placeholder="Description"/>
            <button onClick={() => removeMilestone(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900">Team Members</h2>
          <button onClick={addTeamMember} className="btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"><Plus className="w-3.5 h-3.5"/>Add Member</button>
        </div>
        {about.team?.map((member, idx) => (
          <div key={idx} className="border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${member.color} rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                {member.avatar}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input value={member.name} onChange={e => setTeam(idx,'name',e.target.value)} className="input text-sm font-semibold" placeholder="Name"/>
                <input value={member.role} onChange={e => setTeam(idx,'role',e.target.value)} className="input text-sm" placeholder="Role"/>
              </div>
              <button onClick={() => removeTeamMember(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg flex-shrink-0"><Trash2 className="w-4 h-4"/></button>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-2">
              <input value={member.avatar} onChange={e => setTeam(idx,'avatar',e.target.value)} className="input text-center text-sm" placeholder="AB" maxLength={2}/>
              <input value={member.bio} onChange={e => setTeam(idx,'bio',e.target.value)} className="input text-sm" placeholder="Short bio…"/>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1.5">Avatar Color</p>
              <div className="flex gap-2">
                {avatarColors.map(c => (
                  <button key={c} type="button" onClick={() => setTeam(idx,'color',c)}
                    className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c} border-2 transition-all ${member.color === c ? 'border-blue-500 scale-125' : 'border-transparent hover:scale-110'}`}/>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
