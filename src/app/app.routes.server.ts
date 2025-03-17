import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      try {
        const response = await fetch('https://sib-be.onrender.com/user/blogslugs'); // Replace with actual API
        if (!response.ok) throw new Error('Failed to fetch slugs');
        const slugs = await response.json();

        if (!Array.isArray(slugs)) throw new Error('Invalid response format');
        return slugs.map((slug: string) => ({ slug })); // Ensure correct format
      } catch (error) {
        console.error('Error fetching blog slugs:', error);
        return []; // Return an empty array to prevent prerender errors
      }
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender, // Fallback for all other routes
  }
];
