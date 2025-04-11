import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../shared/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../../core/services/admin.service';
import { EducationService } from '../../../../core/services/education.service';
import { College } from '../../../../shared/models/college';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcourse',
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.css'
})
export class AddcourseComponent implements OnInit {
  sidebarCollapsed: boolean = false;
  isLoading = false;
  courseForm!: FormGroup;
  categories = ["Engineering", "Science", "Management", "Commerce", "Medical", "IT", "Arts", "Law", "Other"];
  colleges: College[] = []; // Make sure you load colleges from backend

  constructor(
    private fb: FormBuilder,
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
    this.initializeForm();
    this.fetchColleges();
  }

  initializeForm(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      degree: ['', Validators.required],
      level: ['', Validators.required],
      category: ['', Validators.required],
      fees: [null, Validators.required],
      durationValue: [null, Validators.required],
      durationUnit: ['month', Validators.required],
      medianLPA: [null, Validators.required],
      affiliation: [''],
      collegeId: [''], // optional
      providerType: ['College'],
      providerName: [''],
      isOnline: [false],
      isOffline: [true],
      isShortTerm: [false] // ✅ New field here
    });
  }

  fetchColleges(): void {
    this.educationService.getColleges().subscribe({
      next: (data) => (this.colleges = data),
      error: (err) => console.error('Error fetching colleges:', err)
    });
  }


  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields!');
      return;
    }

    const formValue = this.courseForm.value;

    const payload = {
      ...formValue,
    };

    this.isLoading = true;
    this.educationService.addCourse(payload).subscribe({
      next: () => {
        this.toastr.success('Course added successfully!');
        this.courseForm.reset();
        this.courseForm.patchValue({
          providerType: 'College',
          isOffline: true,
          isOnline: false,
          isShortTerm: false
        });
        this.router.navigate(['/admin/course']);
      }, error: (err) => {
        console.error('Error adding course:', err)
        this.toastr.error('Failed to add Course. Please try again.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
