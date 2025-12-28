import React, { useState } from 'react';
import { LayoutDashboard, FileText, BookOpen, Menu, X, ShieldAlert } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Generator from './components/Generator';
import Blueprint from './components/Blueprint';
import { CampaignState } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campaign, setCampaign] = useState<CampaignState>({
    target: '',
    industry: '',
    harm: '',
    demand: ''
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard campaign={campaign} onNavigate={setActiveTab} />;
      case 'generator':
        return <Generator campaign={campaign} setCampaign={setCampaign} />;
      case 'blueprint':
        return <Blueprint />;
      default:
        return <Dashboard campaign={campaign} onNavigate={setActiveTab} />;
    }
  };

  const NavItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        activeTab === id
          ? 'bg-slate-800 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-indigo-500" />
            <span className="text-xl font-bold tracking-tight">CivicForce</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          <NavItem id="dashboard" label="Command Center" icon={LayoutDashboard} />
          <NavItem id="generator" label="Deliverables AI" icon={FileText} />
          <NavItem id="blueprint" label="The Blueprint" icon={BookOpen} />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-xs text-slate-400 mb-2">Campaign Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-medium text-white">Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <ShieldAlert className="w-6 h-6 text-indigo-600" />
             <span className="font-bold text-slate-900">CivicForce</span>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
             {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;