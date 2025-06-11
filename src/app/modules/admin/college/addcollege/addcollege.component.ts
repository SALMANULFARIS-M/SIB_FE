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
  existingImages: { url: string; public_id?: string }[] = [];
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
      categories: [[]]
    });
  }

  loadCollegeDetails(id: string): void {
    this.educationService.getCollegeById(id).subscribe({
      next: (res) => {
        const data = res.college;
console.log("Data",data);

        this.collegeForm.patchValue({
          name: data.name,
          universityId: data.universityId?._id || 'autonomous',
          rating: data.rating,
          location: data.location,
          isAutonomous: data.isAutonomous,
          courseLevels: data.courseLevels || [],
          description: data.description,
          feeFrom: data.feeFrom,
          feeUpto: data.feeUpto,
          categories: data.category || []
        });

        // this.selectedCategories = data.category || [];
        this.existingImages = data.photos || [];
        this.previewUrls = [...this.existingImages.map(img => img.url)];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load college:', err);
        this.toastr.error('Failed to load college data.');
        this.isLoading = false;
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

  onCategoryChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const categories = this.collegeForm.get('categories')?.value || [];

    if (input.checked && !categories.includes(input.value)) {
      categories.push(input.value);
    } else if (!input.checked && categories.includes(input.value)) {
      const index = categories.indexOf(input.value);
      categories.splice(index, 1);
    }

    this.collegeForm.get('categories')?.setValue(categories);
  }

  onLevelChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const levels = this.collegeForm.get('courseLevels')?.value || [];
    if (input.checked && !levels.includes(input.value)) {
      levels.push(input.value);
    } else {
      const index = levels.indexOf(input.value);
      if (index > -1) levels.splice(index, 1);
    }
    this.collegeForm.get('courseLevels')?.setValue(levels);
  }

  onFileChange(event: any): void {
    const files = Array.from(event.target.files) as File[];
    files.forEach(file => {
      // Fix: Consider both existing images and new files
      const totalImages = this.existingImages.length + this.selectedFiles.length;
      if (totalImages < 3) {
        this.selectedFiles.push(file);
        this.previewUrls.push(URL.createObjectURL(file));
        this.uploadProgress.push(0);
      }
    });
  }

  removeImage(index: number): void {
    // Fix: Handle removal of both existing and new images
    if (index < this.existingImages.length) {
      // Removing existing image
      this.existingImages.splice(index, 1);
      this.previewUrls.splice(index, 1);
    } else {
      // Removing new file
      const fileIndex = index - this.existingImages.length;
      this.selectedFiles.splice(fileIndex, 1);
      this.previewUrls.splice(index, 1);
      this.uploadProgress.splice(fileIndex, 1);
    }
  }

  onSubmit(): void {
    if (this.collegeForm.invalid) {
      this.collegeForm.markAllAsTouched();
      this.toastr.warning('Please fill all required fields');
      return;
    }

    this.isLoading = true;
    const value = { ...this.collegeForm.value };

    // Fix: Handle autonomous university properly
    if (value.universityId === 'autonomous') {
      value.universityId = '';
    }

    const formData = new FormData();

    // Add basic fields (excluding categories)
    Object.entries(value).forEach(([key, val]) => {
      if (key === 'categories') return;
      if (Array.isArray(val)) {
        val.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, val as string);
      }
    });

    // ✅ Consistently append 'category' field
    const categories = this.collegeForm.get('categories')?.value || [];
    categories.forEach((cat: string) => {
      formData.append('category', cat);
    });

    // Add new files
    this.selectedFiles.forEach((file) => {
      formData.append('photos', file);
    });

    // Fix: For edit mode, send existing images to preserve them
    if (this.isEditMode) {
      formData.append('existingImages', JSON.stringify(this.existingImages));
    }

    const request$ = this.isEditMode
      ? this.educationService.updateCollege(this.collegeId!, formData)
      : this.educationService.addCollege(formData);

    request$.subscribe({
      next: () => {
        this.toastr.success(
          this.isEditMode ? 'College updated successfully!' : 'College added successfully!'
        );
        this.router.navigate(['/admin/college']);
      },
      error: (err) => {
        console.error('Error:', err);
        this.toastr.error(
          this.isEditMode ? 'Failed to update college.' : 'Failed to add college.'
        );
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
