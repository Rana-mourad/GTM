export interface ICPProfile {
  primaryIndustries: string[];
  secondaryIndustries: string[];
  idealCompanySize: string;
  idealRevenueRange: string;
  geographicFocus: string;
  businessMaturity: string;
  operationalComplexity: string;
  technologyAdoption: string;
}

export interface PainPoint {
  category: string;
  description: string;
}

export interface CurrentSolution {
  category: string;
  examples: string[];
}

export interface BuyingTrigger {
  event: string;
  description: string;
}

export interface BudgetProfile {
  allocation: string;
  cycleLength: string;
}

export interface SuccessMetric {
  kpi: string;
  impact: string;
}

export interface CompanyData {
  name: string;
  website: string;
  industry: string;
  headquarters: string;
  employees: string;
  revenue: string;
  fundingStatus: string;
  techStack: string;
  growthSignals: string[];
}

export interface DecisionMakerProfile {
  id: string;
  fullName: string;
  jobTitle: string;
  company: string;
  linkedinUrl: string;
  background: string;
  authorityLevel: 'High' | 'Medium' | 'Low';
  responsibilities: string;
  priorities: string;
  kpis: string;
  email?: string;
  emailPattern?: string;
}

export interface BehaviorProfile {
  decisionMakerId: string;
  activityLevel: 'High' | 'Medium' | 'Low';
  contentTopics: string[];
  interests: string[];
  strategicInitiatives: string;
  communicationStyle: string;
}

export interface OutreachPlan {
  decisionMakerId: string;
  bestChannel: string;
  timingTrigger: string;
  messagingAngle: string;
  personalizationHook: string;
  exampleMessage: string;
}

export interface MarketIntelligence {
  icp: {
    profile: ICPProfile;
    painPoints: PainPoint[];
    currentSolutions: CurrentSolution[];
    buyingTriggers: BuyingTrigger[];
    budgetProfile: BudgetProfile;
    successMetrics: SuccessMetric[];
  };
  companies: CompanyData[];
  decisionMakers: DecisionMakerProfile[];
  behavioralIntelligence: BehaviorProfile[];
  outreachStrategies: OutreachPlan[];
}
