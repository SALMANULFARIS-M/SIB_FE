import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/admin/sidebar/sidebar.component';
import { AdminService } from '../../../core/services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})

export class BlogsComponent {
  sidebarCollapsed = false;

  constructor(private service: AdminService, private router: Router) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }



  blogs = [
    {
      _id: "1",
      title: "Sample Blog",
      featuredImage: "https://via.placeholder.com/300",
      content: [{ type: "paragraph", data: "This is a sample blog post." }],
      author: "salman",
      date: "asdf",
      category: "super"
    },
  ];

  // Function to navigate to add new blog page
  addNewBlog() {
    this.router.navigate(["/admin/blogs-list/blog-add"]);
  }

  // Function to navigate to edit page
  editBlog(blogId: string) {
    this.router.navigate(["/admin/edit-blog", blogId]);
  }
  // Function to navigate to edit page
  viewBlog(blogId: string) {
    this.router.navigate(["/admin/edit-blog", blogId]);
  }

  // Function to delete a blog
  deleteBlog(blogId: string) {
    if (confirm("Are you sure you want to delete this blog?")) {
      // Call API to delete blog (implement backend call here)
      console.log("Deleted blog with ID:", blogId);
    }
  }


}
