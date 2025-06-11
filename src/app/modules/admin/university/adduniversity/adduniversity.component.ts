import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EducationService } from '../../../../core/services/education.service';
import { SidebarComponent } from '../../../../shared/admin/sidebar/sidebar.component';
import { AdminService } from '../../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adduniversity',
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './adduniversity.component.html',
  styleUrl: './adduniversity.component.css'
})
export class AdduniversityComponent implements OnInit {

  universityId: string | null = null;
  isEditMode = false;
  universityForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLoading = false;
  sidebarCollapsed = false;

  constructor(private fb: FormBuilder, private educationService: EducationService,
    private router: Router,
    private route: ActivatedRoute,
    private service: AdminService,
    private toastr: ToastrService) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }

  ngOnInit(): void {
    // Get ID from route for edit mode
    this.route.paramMap.subscribe(params => {
      this.universityId = params.get('id');
      if (this.universityId) {
        this.isEditMode = true;
        this.isLoading = true;
        this.loadUniversityDetails(this.universityId);
      }
    });
    this.universityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [
        Validators.required,
        Validators.minLength(20),  // adjust as needed
        Validators.maxLength(500)  // adjust as needed
      ]]
    });
  }

  loadUniversityDetails(id: string) {
    this.educationService.getUniversityById(id).subscribe({
      next: (data) => {
        this.universityForm.patchValue({
          name: data.university.name,
          description: data.university.description
        });
        this.previewUrl = data.university.logo;
        this.isLoading = false;

      },
      error: (err) => {
        console.error('Error loading university:', err);
        this.toastr.error('Failed to load university details');
      }
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.universityForm.valid) return;

    const formData = new FormData();
    formData.append('name', this.universityForm.get('name')?.value);
    formData.append('description', this.universityForm.get('description')?.value);

    if (this.selectedFile) {
      formData.append('logo', this.selectedFile);
    }

    this.isLoading = true;

    if (this.isEditMode && this.universityId) {
      this.educationService.updateUniversity(this.universityId, formData).subscribe({
        next: () => {
          this.toastr.success('University updated successfully!');
        },
        error: (error) => {
          this.toastr.error('Failed to update university.');
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.educationService.addUniversity(formData).subscribe({
        next: () => {
          this.toastr.success('University added successfully!');
          this.universityForm.reset();
          this.selectedFile = null;
          this.previewUrl = null;
        },
        error: (error) => {
          this.toastr.error('Failed to add university.');
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['/admin/university']);
        }
      });
    }
  }

}
