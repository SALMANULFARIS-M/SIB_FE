import { HttpClient } from '@angular/common/http';
import { environment  } from "./environments/environment.development";
// Example function to fetch slugs from your backend
async function fetchBlogSlugs(): Promise<string[]> {
  const http = new HttpClient(null as any); // Create an instance of HttpClient
  const response = await http.get<string[]>(`${environment.apiUrl}/user/apply`).toPromise();
  return response || [];
}

// Define the getPrerenderParams function
export async function getPrerenderParams() {
  const slugs = await fetchBlogSlugs(); // Fetch slugs from the backend
  return slugs.map(slug => ({ slug })); // Return an array of objects with the `slug` parameter
}
