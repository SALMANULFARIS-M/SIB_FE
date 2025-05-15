import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EducationService } from '../../../../core/services/education.service';
import { SidebarComponent } from '../../../../shared/admin/sidebar/sidebar.component';
import { AdminService } from '../../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduniversity',
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './adduniversity.component.html',
  styleUrl: './adduniversity.component.css'
})
export class AdduniversityComponent implements OnInit {
  universityForm!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLoading = false;
  sidebarCollapsed = false;

  constructor(private fb: FormBuilder, private educationService: EducationService,
    private service: AdminService,
    private toastr: ToastrService) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }

  ngOnInit(): void {
    this.universityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [
        Validators.required,
        Validators.minLength(20),  // adjust as needed
        Validators.maxLength(500)  // adjust as needed
      ]]
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

  async onSubmit() {
    if (!this.universityForm.valid || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('name', this.universityForm.get('name')?.value);
    formData.append('description', this.universityForm.get('description')?.value);
    formData.append('logo', this.selectedFile);

    this.isLoading = true;

    this.educationService.addUniversity(formData).subscribe({
      next: (response) => {
        console.log('University added:', response);
        this.toastr.success('University added successfully!');
        this.universityForm.reset();
        this.selectedFile = null;
        this.previewUrl = null;
      },
      error: (error) => {
        console.error('Error adding university:', error);
        this.toastr.error('Failed to add university. Please try again.');
      },
      complete: () => {
        this.isLoading = false; // Data fetching completed
      }
    });
  }
}
