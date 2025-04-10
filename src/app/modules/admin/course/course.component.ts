import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../../core/services/education.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Course } from '../../../shared/models/course';

@Component({
  selector: 'app-course',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  courses: Course[] = [];
  isLoading = false;
  sidebarCollapsed = false;

  constructor(private service: EducationService, private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.isLoading = true;
    this.service.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.isLoading = false;
      }
    });
  }

  addCourse(): void {
    this.router.navigate(['/admin/add-course']);
  }

  editCourse(courseId: string): void {
    this.router.navigate(['/admin/edit-course', courseId]);
  }

  deleteCourse(courseId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the course.',
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
        this.isLoading = true;
        this.service.deleteCourse(courseId).subscribe({
          next: () => {
            this.courses = this.courses.filter(c => c._id !== courseId);
            this.toastr.success('Course deleted successfully');
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error deleting course:', err);
            this.toastr.error('Failed to delete course');
            this.isLoading = false;
          }
        });
      }
    });
  }
}
