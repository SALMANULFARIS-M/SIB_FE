export interface University {
  _id?: string; // Optional, used when fetched from the DB
  name: string;
  description: string;
  logo?: string;
  colleges: string[]; // Array of ObjectIds as strings
}
