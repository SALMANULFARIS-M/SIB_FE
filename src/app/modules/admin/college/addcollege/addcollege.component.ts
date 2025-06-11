import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../../shared/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../../../core/services/education.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-addcollege',
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './addcollege.component.html',
  styleUrl: './addcollege.component.css'
})
export class AddcollegeComponent {

  collegeId: string | null = null;
  isEditMode: boolean = false;
  collegeForm!: FormGroup;
  universities: any[] = [];
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  uploadProgress: number[] = [];
  isLoading = false;
  sidebarCollapsed: boolean = false;
  categories: string[] = [
    'Engineering',
    'Science',
    'Management',
    'Commerce',
    'Medical',
    'IT',
    'Arts',
    'Law',
    'Design',
    'Education',
    'Nursing',
    'Pharmacy',
    'Hotel Management',
    'Other'
  ];
  selectedCategories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private educationService: EducationService,
    private router: Router,
    private toastr: ToastrService,
    private service: AdminService,
    private route: ActivatedRoute
  ) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.collegeId = params.get('id');
      this.isEditMode = !!this.collegeId;

      if (this.isEditMode && this.collegeId) {
        this.isLoading = true;
        this.loadCollegeDetails(this.collegeId);
      }
    });
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

  loadCollegeDetails(id: string): void {
    this.educationService.getCollegeById(id).subscribe({
      next: (res) => {
        const data = res.college;

        this.collegeForm.patchValue({
          name: data.name,
          universityId: data.universityId.name || 'autonomous',
          rating: data.rating,
          location: data.location,
          isAutonomous: data.isAutonomous,
          courseLevels: data.courseLevels || [],
          description: data.description,
          feeFrom: data.feeFrom,
          feeUpto: data.feeUpto
        });

        this.selectedCategories = data.categories || [];
        this.previewUrls = data.photos || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load college:', err);
        this.toastr.error('Failed to load college data.');
      }
    });
  }

  fetchUniversities(): void {
    this.educationService.getUniversities().subscribe({
      next: (res) => (this.universities = res.universities || []),
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

  onCategoryChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (input.checked) {
      if (!this.selectedCategories.includes(value)) {
        this.selectedCategories.push(value);
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== value);
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
      files.forEach(file => {
        if (!file.type.startsWith('image/')) {
          this.toastr.warning('Only image files are allowed');
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          this.toastr.warning('Max image size is 5MB');
          return;
        }

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

    if (value.universityId === 'autonomous') {
      value.universityId = '';
    }

    const formData = new FormData();
    Object.entries(value).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, val as string);
      }
    });

    this.selectedCategories.forEach((category) => {
      formData.append('categories[]', category);
    });

    this.selectedFiles.forEach((file) => {
      formData.append('photos', file);
    });

    if (this.isEditMode && this.collegeId) {
      this.educationService.updateCollege(this.collegeId, formData).subscribe({
        next: () => {
          this.toastr.success('College updated successfully!');
          this.router.navigate(['/admin/college']);
        },
        error: () => {
          this.toastr.error('Failed to update college.');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.educationService.addCollege(formData).subscribe({
        next: () => {
          this.toastr.success('College added successfully!');
          this.router.navigate(['/admin/college']);
        },
        error: () => {
          this.toastr.error('Failed to add college.');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

}
