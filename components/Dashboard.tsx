import React from 'react';
import { ActionItem, CAMPAIGN_BLUEPRINT, CampaignState } from '../types';
import { CheckCircle2, Circle, AlertTriangle, TrendingUp, ShieldCheck, Users, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  campaign: CampaignState;
  onNavigate: (page: string) => void;
}

const data = [
  { name: 'Day 0', pressure: 10 },
  { name: 'Day 5', pressure: 25 },
  { name: 'Day 10', pressure: 40 },
  { name: 'Day 15', pressure: 35 },
  { name: 'Day 20', pressure: 60 },
  { name: 'Day 25', pressure: 85 },
  { name: 'Day 30', pressure: 100 },
];

const Dashboard: React.FC<DashboardProps> = ({ campaign, onNavigate }) => {
  const [items, setItems] = React.useState<ActionItem[]>(CAMPAIGN_BLUEPRINT);

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const progress = Math.round((items.filter(i => i.completed).length / items.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Campaign Target</h3>
            <Target className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-xl font-bold text-slate-900 truncate">{campaign.target || "Not Set"}</p>
          <p className="text-xs text-slate-400 mt-1">{campaign.industry}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Readiness Score</h3>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">{progress}%</p>
          <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Core Team</h3>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xl font-bold text-slate-900">1 / 12</p>
          <p className="text-xs text-slate-400 mt-1">Recruiting</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-500 text-sm font-medium">Days Remaining</h3>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900">30</p>
          <p className="text-xs text-slate-400 mt-1">Phase: Triage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tactical Checklist */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800">Operational Blueprint</h2>
            <button 
              onClick={() => onNavigate('blueprint')} 
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Full Strategy &rarr;
            </button>
          </div>
          <div className="p-0 overflow-y-auto max-h-[500px]">
            {['Immediate', 'Week 1', 'Week 2', 'Week 3', 'Week 4'].map((phase) => (
              <div key={phase} className="border-b border-slate-50 last:border-0">
                <div className="bg-slate-50/50 px-6 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {phase}
                </div>
                {items.filter(i => i.phase === phase).map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => toggleItem(item.id)}
                    className="flex items-center px-6 py-4 hover:bg-slate-50 cursor-pointer group transition-colors"
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-4 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 mr-4 flex-shrink-0 group-hover:text-indigo-500" />
                    )}
                    <span className={`text-sm font-medium ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Impact Projection */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Pressure Projection</h2>
            <p className="text-sm text-slate-500">Projected organizational stress on target.</p>
          </div>
          <div className="flex-grow min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{color: '#4f46e5', fontWeight: 600}}
                />
                <Area type="monotone" dataKey="pressure" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorPressure)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-amber-900">Next Critical Action</h4>
                <p className="text-xs text-amber-800 mt-1">
                  Generate and publish the <b>Declaration of Nonviolence</b> to establish moral high ground.
                </p>
                <button 
                  onClick={() => onNavigate('generator')}
                  className="mt-2 text-xs bg-white text-amber-700 border border-amber-200 px-3 py-1 rounded-md font-medium hover:bg-amber-50"
                >
                  Go to Generator
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;