import { Course } from "./course";

export interface College {
  _id?: string; // Optional, used when fetched from the DB
  name: string;
  universityId?: string; // ObjectId as string or undefined for autonomous
  rating?: number;
  location?: string;
  isAutonomous?: boolean;
  photos?: {
    url: string;
    public_id: string;
  }[]; // Match Mongoose schema
  courseLevels?: string[]; // ['UG', 'PG']
  availableCourses?: Course[]; // ObjectId as string
  categories?: string[];
  description: string;
  feeFrom: number;
  feeUpto: number;
  category?: string[];
}
