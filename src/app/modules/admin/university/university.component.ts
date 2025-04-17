import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../../core/services/education.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { University } from '../../../shared/models/university';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-university',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './university.component.html',
  styleUrl: './university.component.css'
})
export class UniversityComponent {
  universities: University[] = [];
  isLoading = false;
  sidebarCollapsed = false;

  constructor(
    private educationService: EducationService,
    private router: Router,
    private toastr: ToastrService,
    private service: AdminService
  ) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }


  ngOnInit(): void {
    this.fetchUniversities();
  }

  fetchUniversities(): void {
    this.isLoading = true;
    this.educationService.getUniversities().subscribe({
      next: (res) => {
        this.universities = res.universities || []; // adjust based on your API response
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching universities:', err);
        this.isLoading = false;
      }
    });
  }

  addUniversity(): void {
    this.router.navigate(['/admin/university/add-university']);
  }

  editUniversity(id: string): void {
    this.router.navigate(['/admin/university/edit', id]);
  }

  deleteUniversity(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the university.',
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
        this.educationService.deleteUniversity(id).subscribe({
          next: () => {
            this.universities = this.universities.filter(u => u._id !== id);
            this.toastr.success('University deleted successfully');
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error deleting university:', err);
            this.toastr.error('Failed to delete university');
            this.isLoading = false;
          }
        });
      }
    });
  }


}
