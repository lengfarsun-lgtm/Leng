export type UserRole = 'owner' | 'management' | 'logistic' | 'client';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  isDemo?: boolean;
}

export interface PillarData {
  nameZh: string;
  nameEn: string;
  stemZh: string;
  stemPinyin: string;
  stemElementZh: string;
  branchZh: string;
  branchPinyin: string;
  branchZodiacZh: string;
  branchZodiacEn: string;
  tenGodZh: string;
  tenGodEn: string;
  naYinZh: string;
  naYinEn: string;
  changShengZh: string;
  changShengEn: string;
  hiddenStemsZh: string;
  hiddenStemsRolesZh: string;
  colorClass: string;
  isDayMaster?: boolean;
}

export interface FourPillars {
  hour: PillarData;
  day: PillarData;
  month: PillarData;
  year: PillarData;
}

export interface ElementWeights {
  fire: number;
  water: number;
  metal: number;
  wood: number;
  earth: number;
}

export interface LuckPillar {
  yearsRange: string;
  ageRange: string;
  stemBranch: string;
  tenGod: string;
  summary: string;
  isActive?: boolean;
}

export interface RemedyItem {
  id: string;
  code: string;
  name: string;
  category: string;
  elementZh: string;
  image: string;
  description: string;
  placementZh: string;
  instructionsZh: string;
}

export interface ConsultationSubmission {
  id: string;
  userId: string;
  fullName: string;
  chineseName?: string;
  gender: 'male' | 'female';
  birthPlace: string;
  solarOffsetMinutes: number;
  lunarYear: string;
  lunarMonth: number;
  isLeapMonth: boolean;
  lunarDay: number;
  shichen: string;
  problemCategories: string[];
  problemDescription: string;
  propertyAddress?: string;
  luoPanFacing?: string;
  reportLanguage: 'zh' | 'en' | 'bilingual';
  status: 'draft' | 'processing' | 'in_review' | 'approved' | 'delivered';
  createdAt: string;
  calculatedSolarDate?: string;
  solarTimeAdjusted?: string;
  solarTermCheck?: string;
  zodiacSign?: string;
}

export interface BaziReport {
  id: string;
  submissionId: string;
  clientName: string;
  clientNameEn?: string;
  gender: 'male' | 'female';
  solarBirthDate: string;
  lunarBirthDate: string;
  status: 'draft' | 'in_review' | 'approved' | 'delivered';
  approvedBy?: string;
  approvedDate?: string;
  masterLicense?: string;
  fourPillars: FourPillars;
  patternJudgmentZh: string;
  patternStatusZh: string;
  patternSummaryZh: string;
  beneficialElementsZh: string;
  beneficialNoteZh: string;
  avoidanceElementsZh: string;
  avoidanceNoteZh: string;
  elementWeights: ElementWeights;
  executiveOverviewZh: string;
  wealthSectionZh: {
    title: string;
    analysis: string;
    optimalDirections: string;
    optimalDirectionsNote: string;
    activationTiming: string;
    activationTimingNote: string;
    breakthroughNote: string;
  };
  careerSectionZh: {
    title: string;
    currentYearAnalysis: string;
    nextYearAnalysis: string;
    bestIndustries: string;
  };
  luckPillars: LuckPillar[];
  remedies: RemedyItem[];
  logisticsTask?: LogisticsTask;
  sha256Verification: string;
}

export interface LogisticsTask {
  id: string;
  reportId: string;
  clientName: string;
  clientPhone?: string;
  vipTag?: string;
  serviceCategory: string;
  remedyName: string;
  remedyImage: string;
  address: string;
  distanceKm: number;
  assignedStaff: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'failed';
  scheduledTime: string;
  proofPhotoUrl?: string;
  coordinates?: { lat: number; lng: number };
  steps: {
    stepNumber: number;
    title: string;
    time: string;
    description: string;
    status: 'completed' | 'in_progress' | 'pending';
  }[];
}

export interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  metadata: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stockCount: number;
  unit: string;
  alert?: boolean;
}
