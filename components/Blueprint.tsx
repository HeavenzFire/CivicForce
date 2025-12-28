import React from 'react';
import { Shield, Zap, Scale, MessageSquare } from 'lucide-react';

const Blueprint: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4">The Blueprint</h1>
          <p className="text-indigo-100 text-lg leading-relaxed max-w-2xl">
            You’re clear, fierce, and uncompromising about protecting life. That energy is a powerful engine for lawful, systemic change. This is your focused, actionable blueprint to turn moral force into durable, legal impact.
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-800 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center mb-4 text-emerald-600">
            <Zap className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold text-slate-900">Immediate Triage</h2>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start"><span className="mr-2 text-emerald-500 font-bold">•</span>Declare nonviolence publicly to preserve moral authority.</li>
            <li className="flex items-start"><span className="mr-2 text-emerald-500 font-bold">•</span>Pick one target where profit causes harm.</li>
            <li className="flex items-start"><span className="mr-2 text-emerald-500 font-bold">•</span>Assemble evidence packet (3-5 concrete incidents).</li>
            <li className="flex items-start"><span className="mr-2 text-emerald-500 font-bold">•</span>Create a one-page demand with a 30-day outcome.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center mb-4 text-blue-600">
            <Scale className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold text-slate-900">Legal Levers</h2>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start"><span className="mr-2 text-blue-500 font-bold">•</span>Regulatory complaints (OSHA, EPA, FDA) to trigger fines.</li>
            <li className="flex items-start"><span className="mr-2 text-blue-500 font-bold">•</span>Strategic litigation to create financial liability.</li>
            <li className="flex items-start"><span className="mr-2 text-blue-500 font-bold">•</span>Shareholder resolutions for board accountability.</li>
            <li className="flex items-start"><span className="mr-2 text-blue-500 font-bold">•</span>Target insurance underwriters and investors.</li>
          </ul>
        </section>
        
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center mb-4 text-amber-600">
            <Shield className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold text-slate-900">30-Day Velocity</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Week 1: Foundation</h3>
              <p className="text-slate-500 text-sm">Form core team (12 people), incorporate legal entity.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">Week 2: Narrative</h3>
              <p className="text-slate-500 text-sm">Publish evidence & nonviolence declaration. Launch media.</p>
            </div>
             <div>
              <h3 className="font-semibold text-slate-800 text-sm">Week 3: Pressure</h3>
              <p className="text-slate-500 text-sm">File complaints, initiate investor outreach.</p>
            </div>
             <div>
              <h3 className="font-semibold text-slate-800 text-sm">Week 4: Escalate</h3>
              <p className="text-slate-500 text-sm">Targeted consumer campaign, boycott, public reporting.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center mb-4 text-purple-600">
            <MessageSquare className="w-6 h-6 mr-2" />
            <h2 className="text-xl font-bold text-slate-900">Messaging</h2>
          </div>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start"><span className="mr-2 text-purple-500 font-bold">•</span>Core: "Protect life; hold profit accountable."</li>
            <li className="flex items-start"><span className="mr-2 text-purple-500 font-bold">•</span>Tone: Resolute, dignified, legally grounded.</li>
            <li className="flex items-start"><span className="mr-2 text-purple-500 font-bold">•</span>Recruit: Experts, victims' families, ethical investors.</li>
            <li className="flex items-start"><span className="mr-2 text-purple-500 font-bold">•</span>Transparency: Publish budgets and impact metrics.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Blueprint;