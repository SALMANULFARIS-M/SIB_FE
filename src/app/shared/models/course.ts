import { College } from "./college";

export interface Course {
  _id?: string; // Optional, used when fetched from the DB
  title: string;
  degree: string;
  level: 'UG' | 'PG' | 'Course';
  category: 'Engineering' | 'Science' | 'Management' | 'Commerce' | 'Medical' | 'Arts' | 'Law' |
    'Design' | 'Education' | 'Nursing' | 'Pharmacy' | 'Hotel Management' | 'Other';
  fees: number;
  durationValue: number;
  durationUnit: 'month' | 'year';
  medianLPA: number;
  affiliation: string;
  collegeId?: string | College | null;
  providerType: 'College' | 'Institute' | 'OnlinePlatform';
  providerName?: string | null;
  isShortTerm: boolean;
  isOnline: boolean;
  isOffline: boolean;
}
