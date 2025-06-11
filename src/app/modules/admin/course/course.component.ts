import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../../core/services/education.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Course } from '../../../shared/models/course';
import { AdminService } from '../../../core/services/admin.service';

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

  constructor(private educationService: EducationService, private router: Router,
    private toastr: ToastrService,
    private service: AdminService
  ) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.isLoading = true;
    this.educationService.getCourses().subscribe({
      next: (res) => {
        this.courses = res.courses || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.isLoading = false;
      }
    });
  }

  addCourse(): void {
    this.router.navigate(['/admin/course/add-course']);
  }

  editCourse(courseId: string): void {
    this.router.navigate(['/admin/course/edit', courseId]);
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
        this.educationService.deleteCourse(courseId).subscribe({
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
