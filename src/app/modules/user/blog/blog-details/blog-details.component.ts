import { Component, OnInit } from '@angular/core';
import { Blog } from '../../user.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { NavComponent } from '../../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../../shared/user/footer/footer.component';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  imports: [NavComponent, FooterComponent,RouterModule,CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog | null = null; // Properly typed
  slug: string | null = null;
  latestBlogs: Blog[] = [];

  constructor(private route: ActivatedRoute, private service: UserService, private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug'); // Get updated slug from the URL
      if (this.slug) {
        this.fetchBlog(this.slug);
      } else {
        this.router.navigate(['/blogs']); // Redirect if no slug
      }
    });

    this.fetchLatestBlogs();
  }

  goBack(): void {
    this.location.back();
  }


  fetchBlog(slug: string) {
    this.service.getBlogBySlug(slug).subscribe({
      next: (data) => {
        this.blog = data;
      },
      error: (err) => {
        this.router.navigate(['/blogs']); // Redirect if blog not found
      }
    });
  }

  fetchLatestBlogs() {
    this.service.latestBlogs().subscribe({
      next: (response) => {
          this.latestBlogs = response;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      }
    });
  }
// Helper method to check if a value is an array
isArray(data: any): data is string[] {
  return Array.isArray(data);
}

}
