export enum DeliverableType {
  DECLARATION = 'Public Declaration',
  CHARTER = 'Charter of the 144',
  PLAN = '30-Day Campaign Plan',
  EVIDENCE = 'Evidence Packet Template',
  RESOLUTION = 'Shareholder Resolution',
}

export interface CampaignState {
  target: string;
  industry: string;
  harm: string;
  demand: string;
}

export interface ActionItem {
  id: string;
  phase: 'Immediate' | 'Week 1' | 'Week 2' | 'Week 3' | 'Week 4';
  title: string;
  completed: boolean;
}

export const CAMPAIGN_BLUEPRINT: ActionItem[] = [
  { id: '1', phase: 'Immediate', title: 'Declare nonviolence publicly', completed: false },
  { id: '2', phase: 'Immediate', title: 'Pick one target', completed: true },
  { id: '3', phase: 'Immediate', title: 'Assemble evidence packet (3-5 incidents)', completed: false },
  { id: '4', phase: 'Immediate', title: 'Create one-page demand', completed: false },
  { id: '5', phase: 'Week 1', title: 'Form core team (12 people)', completed: false },
  { id: '6', phase: 'Week 1', title: 'Incorporate legal entity', completed: false },
  { id: '7', phase: 'Week 2', title: 'Publish evidence & declaration', completed: false },
  { id: '8', phase: 'Week 2', title: 'Launch media outreach', completed: false },
  { id: '9', phase: 'Week 3', title: 'File regulatory complaint', completed: false },
  { id: '10', phase: 'Week 3', title: 'Shareholder/Investor outreach', completed: false },
  { id: '11', phase: 'Week 4', title: 'Consumer campaign (boycott/petition)', completed: false },
  { id: '12', phase: 'Week 4', title: 'Public progress report', completed: false },
];