import React, { useState } from 'react';
import { CampaignState, DeliverableType } from '../types';
import { generateDeliverable } from '../services/geminiService';
import { FileText, Loader2, PenTool, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface GeneratorProps {
  campaign: CampaignState;
  setCampaign: React.Dispatch<React.SetStateAction<CampaignState>>;
}

const Generator: React.FC<GeneratorProps> = ({ campaign, setCampaign }) => {
  const [selectedType, setSelectedType] = useState<DeliverableType>(DeliverableType.DECLARATION);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!campaign.target || !campaign.harm) {
      alert("Please define the Target and the Harm/Issue first.");
      return;
    }
    setLoading(true);
    setResult('');
    const text = await generateDeliverable(selectedType, campaign);
    setResult(text);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
      {/* Configuration Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col overflow-y-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
          <PenTool className="w-5 h-5 mr-2 text-indigo-600" />
          Campaign Context
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Entity</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g. Acme Chemical Corp"
              value={campaign.target}
              onChange={(e) => setCampaign({...campaign, target: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g. Petrochemical Manufacturing"
              value={campaign.industry}
              onChange={(e) => setCampaign({...campaign, industry: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Specific Harm</label>
            <textarea 
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition h-24 resize-none"
              placeholder="e.g. Discharging untreated benzene into the local river causing higher cancer rates."
              value={campaign.harm}
              onChange={(e) => setCampaign({...campaign, harm: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Key Demand</label>
            <input 
              type="text" 
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="e.g. Install filtration system by Q3."
              value={campaign.demand}
              onChange={(e) => setCampaign({...campaign, demand: e.target.value})}
            />
          </div>
        </div>

        <div className="border-t border-slate-100 my-6 pt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">Deliverable Type</label>
          <div className="grid grid-cols-1 gap-2">
            {Object.values(DeliverableType).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  selectedType === type 
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={handleGenerate}
            disabled={loading || !campaign.target}
            className={`w-full flex items-center justify-center py-3 rounded-lg font-bold text-white transition-all shadow-md ${
              loading || !campaign.target
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform active:scale-95'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Drafting Strategy...
              </>
            ) : (
              <>
                Generate Deliverable
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-2 bg-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-700">
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-slate-400 font-mono text-sm">{selectedType.toLowerCase().replace(' ', '_')}.md</span>
          </div>
          {result && (
            <button 
              onClick={handleCopy}
              className="text-slate-400 hover:text-white transition-colors flex items-center text-xs uppercase font-semibold tracking-wider"
            >
              {copied ? <Check className="w-4 h-4 mr-1.5 text-green-500" /> : <Copy className="w-4 h-4 mr-1.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          )}
        </div>
        <div className="flex-grow p-8 overflow-y-auto bg-slate-800">
          {result ? (
            <div className="prose prose-invert prose-slate max-w-none">
                {/* We use a simple whitespace preservation here, but in a real app would use ReactMarkdown */}
                <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-300">
                   {result}
                </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
              <FileText className="w-16 h-16 mb-4" />
              <p className="text-lg">Ready to generate.</p>
              <p className="text-sm">Configure your campaign details on the left.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;