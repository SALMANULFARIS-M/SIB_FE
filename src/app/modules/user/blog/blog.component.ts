import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavComponent } from '../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, FooterComponent, NavComponent, RouterModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogs: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  searchQuery: string = '';

  constructor(private service: UserService,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchBlogs(); // Fetch blogs when the component initializes
    }
  }

  fetchBlogs() {
    this.service.getBlogsWithQuery(this.currentPage, this.itemsPerPage, this.searchQuery)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.blogs = response.blogs;
            this.totalPages = response.pagination.totalPages;
          }
        },
        error: (err) => {
          console.error("Error fetching blogs:", err);
        }
      });
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchBlogs();
    }
  }

  updateSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.currentPage = 1;
    this.fetchBlogs();
  }

}
