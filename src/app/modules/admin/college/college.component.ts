import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../../core/services/education.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { College } from '../../../shared/models/college';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-college',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './college.component.html',
  styleUrl: './college.component.css'
})
export class CollegeComponent {
  colleges: College[] = [];
  isLoading: boolean = false;
  sidebarCollapsed: boolean = false;

  constructor(
    private service: AdminService,
    private educationService: EducationService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }

  ngOnInit(): void {
    this.fetchColleges();
  }

  fetchColleges(): void {
    this.isLoading = true;
    this.educationService.getColleges().subscribe({
      next: (res) => {
        this.colleges = res || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching colleges:', err);
        this.toastr.error('Failed to load colleges');
        this.isLoading = false;
      }
    });
  }

  addCollege(): void {
    this.router.navigate(['/admin/college/add-college']);
  }

  editCollege(id: string): void {
    this.router.navigate([`/admin/colleges/edit/${id}`]);
  }

  deleteCollege(id: string): void {
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
        this.isLoading = true;
        this.educationService.deleteCollege(id).subscribe({
          next: () => {
            this.toastr.success('College deleted successfully');
            this.fetchColleges();
          },
          error: (err) => {
            console.error('Delete error:', err);
            this.toastr.error('Failed to delete college');
            this.isLoading = false;
          }
        });
      }
    });
  }

}
