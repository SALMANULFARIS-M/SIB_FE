import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SidebarComponent } from '../../../shared/admin/sidebar/sidebar.component';
import { AdminService } from '../../../core/services/admin.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Blog } from "../../../shared/models/user.interface";
@Component({
  selector: 'app-blogs',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})

export class BlogsComponent implements OnInit {
  sidebarCollapsed: boolean = false;
  blogs: Blog[] = [];
  currentPage = 1;
  totalPages = 1;
  searchQuery = '';
  isLoading: boolean = true;
  constructor(
    private readonly service: AdminService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    this.subscribeToSidebarState();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBlogs();
    }
  }

  /** Subscribe to sidebar collapse state */
  private subscribeToSidebarState(): void {
    this.service.collapsedState.subscribe((state: boolean) => {
      this.sidebarCollapsed = state;
    });
  }

  /** Fetches blogs from the API */
  private loadBlogs(): void {
    this.service.getBlogs(this.currentPage, 6, this.searchQuery).subscribe({
      next: (response) => {
        if (response?.success) {
          this.blogs = response.blogs;
          this.totalPages = response.pagination.totalPages;
                } else {
          this.toastr.error('Unexpected response format.', 'Error');
        }
      },
      error: (error) => {
        this.toastr.error('Failed to fetch blogs. Please try again.', 'Error');
      },
      complete: () => {
        this.isLoading = false; // Data fetching completed
      }
    });
  }

  /** Navigates to the Add Blog page */
  addNewBlog(): void {
    this.router.navigate(['/admin/blogs-list/blog-add']);
  }

  /** Navigates to the Edit Blog page */
  editBlog(blogId: any): void {
    this.router.navigate(['/admin/edit-blog', blogId]);
  }

  /** Navigates to the View Blog page */
  viewBlog(blogId: any): void {
    this.router.navigate(['/admin/view-blog', blogId]);
  }

  /** Deletes a blog with confirmation */
  deleteBlog(blogId: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      background: '#2D1044',
      color: '#d5a1ff',
      confirmButtonColor: 'rgb(204, 30, 30)',
      cancelButtonColor: '#0f66b8',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performDeleteBlog(blogId);
      }
    });
  }

  /** Performs blog deletion */
  private performDeleteBlog(blogId: string): void {
    this.service.deleteBlog(blogId).subscribe({
      next: () => {
        this.blogs = this.blogs.filter(blog => blog._id !== blogId);
        this.toastr.success('Blog deleted successfully!', 'Success');
      },
      error: (error) => {
        console.error('Error deleting blog:', error);
        this.toastr.error('Failed to delete blog. Please try again.', 'Error');
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBlogs();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBlogs();
    }
  }

  searchBlogs() {
    this.currentPage = 1;
    this.loadBlogs();
  }
  sortBlogs(event: any) {
    const sortBy = event.target.value;

    this.blogs.sort((a, b) => {
      const dateA = a.publishedDate ? new Date(a.publishedDate).getTime() : 0;
      const dateB = b.publishedDate ? new Date(b.publishedDate).getTime() : 0;

      if (!dateA || !dateB) return 0; // Prevent sorting issues if date is missing

      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }

}
