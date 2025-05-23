import { College } from "./college";

export interface University {
  _id?: string; // Optional, used when fetched from the DB
  name: string;
  description: string;
  logo?: string;
  colleges: College[]; // Array of ObjectIds as strings
}
