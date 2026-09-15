export interface MetricItem {
  id: string;
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  subtext?: string;
  badge?: string;
}

export interface ProposalGlanceItem {
  currentConstraint: string;
  proposedResponse: string;
  resultToTest: string;
}

export interface ExistingChannel {
  channel: string;
  currentHandling: string;
  confirmedConstraint: string;
}

export interface ExistingSystem {
  system: string;
  currentRole: string;
  relevantContractPosition: string;
}

export interface ProblemItem {
  problem: string;
  operationalEffect: string;
  designImplication: string;
}

export interface ScopeBoundary {
  included: string;
  outside: string;
}

export interface DesignPrinciple {
  title: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface AiGovernanceRow {
  task: string;
  evidenceUsed: string;
  output: string;
  notAuthorised: string;
  fallback: string;
}

export interface SystemAuthorityRow {
  informationOrAction: string;
  authoritativeSystem: string;
  permittedDirection: string;
  notes?: string;
}

export interface DomusOneStatusRow {
  status: string;
  primaryControl: string;
  residentCommunication: string;
  badgeType: 'initial' | 'progress' | 'waiting' | 'completion' | 'exception';
}

export interface ResidentSmsMilestone {
  milestone: string;
  messagePurpose: string;
  control: string;
}

export interface RaciRow {
  activity: string;
  residentServicesAgent: 'R' | 'A' | 'C' | 'I' | '-';
  residentServicesLead: 'R' | 'A' | 'C' | 'I' | '-';
  maintenanceCoordinator: 'R' | 'A' | 'C' | 'I' | '-';
  contractor: 'R' | 'A' | 'C' | 'I' | '-';
  oohProvider: 'R' | 'A' | 'C' | 'I' | '-';
  onCallDutyManager: 'R' | 'A' | 'C' | 'I' | '-';
  itAndSystemOwners: 'R' | 'A' | 'C' | 'I' | '-';
  dpo: 'R' | 'A' | 'C' | 'I' | '-';
  implementationPartner: 'R' | 'A' | 'C' | 'I' | '-';
}

export interface BudgetScenario {
  id: 'core' | 'recommended' | 'expanded';
  name: string;
  scopeSummary: string;
  baseFirstYear: number;
  budgetCeilingDelta: number; // positive = over, negative = under
  lowPlanningCase: number;
  basePlanningCase: number;
  highPlanningCase: number;
  status: 'within_budget' | 'over_budget';
  badge: string;
  highlights: string[];
}

export interface BudgetCostItem {
  costItem: string;
  coreCost: number | null;
  recommendedCost: number | null;
  expandedCost: number | null;
  status: string;
  category: 'Licence & Platform' | 'Implementation & Setup' | 'Communications' | 'Contingency';
  isRecurring: boolean;
}

export interface ImplementationPhase {
  phaseNumber: number;
  name: string;
  purpose: string;
  keyOutputs: string[];
  durationWeeks?: string;
}

export interface MeasurementMetric {
  measure: string;
  definition: string;
  source: string;
  targetOrBaseline: string;
}

export interface RiskItem {
  risk: string;
  consequence: string;
  mitigation: string;
  severity: 'high' | 'medium' | 'critical';
}

export interface OpenValidationItem {
  id: string;
  status: 'Client input required' | 'Technical validation required' | 'Open decision' | 'Proof of concept' | 'Data-protection approval' | 'Commercial validation' | 'Operating decision';
  item: string;
  whyItMatters: string;
}

// Blueprint Types
export type BlueprintActor = 
  | 'resident'
  | 'zendesk'
  | 'customer_service'
  | 'connector'
  | 'domusone'
  | 'external_notification';

export interface BlueprintStep {
  id: string;
  actor: BlueprintActor;
  actorLabel: string;
  title: string;
  description: string;
  implementationBadge: string;
  detailedSpecs?: string[];
  rules?: string[];
}

export interface BlueprintLane {
  id: string;
  title: string;
  subtitle?: string;
  steps: BlueprintStep[];
}

export interface BlueprintModule {
  id: string;
  tabKey: string;
  number: string;
  title: string;
  subHeader: string;
  steps: BlueprintStep[];
  ruleSummary?: {
    leftTitle?: string;
    leftContent?: string[];
    rightTitle?: string;
    rightContent?: string[];
    footerNote?: string;
  };
  tableData?: Array<Record<string, string>>;
}
