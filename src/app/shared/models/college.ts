export interface College {
  _id?: string; // Optional, used when fetched from the DB
  name: string;
  universityId?: string; // ObjectId as string
  rating?: number;
  location?: string;
  isAutonomous?: boolean;
  photos?: string[]; // Google image URLs
  courseLevels?: string[]; // ['UG', 'PG']
  availableCourses?: string[]; // ObjectId as string
  description: string;
  feeFrom: number;
  feeUpto: number;
}
