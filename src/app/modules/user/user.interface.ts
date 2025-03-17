export interface Blog {
  _id?: string; // Optional, since MongoDB generates _id automatically
  title: string;
  slug?: string; // Optional, as it's unique but not required
  featuredImage: string;
  author: string;
  publishedDate?: Date; // Optional because of default value in schema
  category: string;
  content: Array<{
    type: "paragraph" | "heading" | "list" | "image";
    headingLevel?: 1 | 2; // Required only for "heading", matching Mongoose schema
    data: string | string[]; // String for most, array only for "list"
  }>;
}
