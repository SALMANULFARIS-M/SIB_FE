import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../../shared/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../../../core/services/education.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../../core/services/admin.service';
import { log } from 'console';

@Component({
  selector: 'app-addcollege',
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './addcollege.component.html',
  styleUrl: './addcollege.component.css'
})
export class AddcollegeComponent {
  collegeForm!: FormGroup;
  universities: any[] = [];
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  uploadProgress: number[] = [];
  isLoading = false;
  sidebarCollapsed: boolean = false;

  constructor(
    private fb: FormBuilder,
    private educationService: EducationService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private service: AdminService
  ) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchUniversities();
  }

  initForm(): void {
    this.collegeForm = this.fb.group({
      name: ['', Validators.required],
      universityId: ['', Validators.required],
      rating: [0],
      location: [''],
      isAutonomous: [false],
      courseLevels: [[]],
      description: ['', Validators.required],
      feeFrom: [null, Validators.required],
      feeUpto: [null, Validators.required],
    });
  }

  fetchUniversities(): void {
    this.educationService.getUniversities().subscribe({
      next: (res) => (this.universities = res || []),
      error: () => this.toastr.error('Failed to load universities'),
    });
  }

  onUniversityChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;

    if (selectedValue === 'autonomous') {
      this.collegeForm.patchValue({
        universityId: 'autonomous',
        isAutonomous: true,
      });
    } else if (selectedValue === 'add-new') {
      this.router.navigate(['/admin/university/add-university']);
    } else {
      this.collegeForm.patchValue({
        isAutonomous: false,
      });
    }
  }


  onLevelChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const levels = this.collegeForm.get('courseLevels')?.value || [];
    if (input.checked) levels.push(input.value);
    else levels.splice(levels.indexOf(input.value), 1);
    this.collegeForm.get('courseLevels')?.setValue(levels);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files).slice(0, 3 - this.selectedFiles.length);
      if (files.length < input.files.length) {
        this.toastr.warning('Only up to 3 images allowed');
      }

      files.forEach(file => {
        this.selectedFiles.push(file);
        this.previewUrls.push(URL.createObjectURL(file));
        this.uploadProgress.push(0);
      });
    }
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
    this.uploadProgress.splice(index, 1);
  }

  onSubmit(): void {
    if (this.collegeForm.invalid) {
      this.collegeForm.markAllAsTouched();
      this.toastr.warning('Please fill all required fields');
      return;
    }

    this.isLoading = true;

    const value = { ...this.collegeForm.value };

    // If it's autonomous, set universityId to empty string BEFORE appending
    if (value.universityId === 'autonomous') {
      value.universityId = '';
    }
    const formData = new FormData();
    Object.entries(this.collegeForm.value).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(`${key}[]`, v));
      } else {
        formData.append(key, value as string);
      }
    });

    this.selectedFiles.forEach(file => {
      formData.append('photos', file);
    });
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
        this.educationService.addCollege(formData).subscribe({
      next: (response) => {
        console.log('college added:', response);
        this.toastr.success('College added successfully!');
        this.collegeForm.reset();
        this.selectedFiles = [];
        this.previewUrls = [];
        this.uploadProgress = [];
        this.router.navigate(['/admin/college']);
      },
      error: (error) => {
        console.error('Error adding college:', error);
        this.toastr.error('Failed to add College. Please try again.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
