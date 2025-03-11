import { Component } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../shared/admin/sidebar/sidebar.component';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addblogs',
  imports: [CommonModule, SidebarComponent, ReactiveFormsModule],
  templateUrl: './addblogs.component.html',
  styleUrl: './addblogs.component.css'
})
export class AddblogsComponent {
  sidebarCollapsed = false;
  blogForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;


  constructor(private service: AdminService, private router: Router,
    private fb: FormBuilder, private toastr: ToastrService
  ) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      featuredImage: [null, Validators.required],
      content: this.fb.array([]), // Initialize as an empty array
    });
    this.addContentBlock(); // Start with one empty content block
  }

  get contentControls() {
    return this.blogForm.get('content') as FormArray;
  }
  // Add a new content block
  addContentBlock() {
    this.contentControls.push(
      this.fb.group({
        type: ['', Validators.required],
        data: ['', Validators.required],
        level: [null],
      })
    );
  }

  removeContentBlock(index: number) {
    this.contentControls.removeAt(index);
  }

  // Handle File Upload & Preview
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Show image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // Update form value
      this.blogForm.patchValue({ featuredImage: file });
    }
  }

  // Reset Form
  cancel() {
    this.blogForm.reset();
    this.contentControls.clear();
    this.addContentBlock();
    this.selectedFile = null;
    this.previewUrl = null;
  }

  // Submit Form
  onSubmit() {
    if (this.blogForm.invalid || !this.selectedFile) {
      this.blogForm.markAllAsTouched(); // Show validation errors
      this.toastr.error('Please fill all fields', 'Validation Error');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.blogForm.value.title);
    formData.append('author', this.blogForm.value.author);
    formData.append('featuredImage', this.selectedFile!);
    formData.append('content', JSON.stringify(this.blogForm.value.content));

    // Send data to backend
    this.service.addBlog(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success('Blog added successfully!', 'Success');
          this.blogForm.reset();
          this.cancel()
        }
      },
      error: (error) => {
        console.error('Error adding blog', error);
        this.toastr.error('Failed to add blog. Try again later.', 'Error');
      }
    });
  }

}
