import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../shared/admin/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../../core/services/admin.service';
import { EducationService } from '../../../../core/services/education.service';
import { College } from '../../../../shared/models/college';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addcourse',
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './addcourse.component.html',
  styleUrl: './addcourse.component.css'
})
export class AddcourseComponent implements OnInit {

  courseId: string | null = null;
  isEditMode: boolean = false;
  sidebarCollapsed: boolean = false;
  isLoading = false;
  courseForm!: FormGroup;
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
  colleges: College[] = []; // Make sure you load colleges from backend

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
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.courseId = id;
        this.isEditMode = true;
        this.isLoading = true;
        this.fetchCourseById(id);
      }
    });
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
      isShortTerm: [false]
    });
  }

  fetchColleges(): void {
    this.educationService.getColleges().subscribe({
      next: (data) => (this.colleges = data.colleges),
      error: (err) => console.error('Error fetching colleges:', err)
    });
  }

  fetchCourseById(id: string): void {
    this.educationService.getCourseById(id).subscribe({
      next: (res) => {
        const course = res.course;
        if (course) {
          this.courseForm.patchValue({
            title: course.title,
            degree: course.degree,
            level: course.level,
            category: course.category,
            fees: course.fees,
            durationValue: course.durationValue,
            durationUnit: course.durationUnit,
            medianLPA: course.medianLPA,
            affiliation: course.affiliation,
            collegeId: course.collegeId || '',
            providerType: course.providerType,
            providerName: course.providerName,
            isOnline: course.isOnline,
            isOffline: course.isOffline,
            isShortTerm: course.isShortTerm
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching course:', err);
        this.toastr.error('Failed to load course for editing.');
      }
    });
  }


  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields!');
      return;
    }

    const payload = { ...this.courseForm.value };
    this.isLoading = true;

    if (this.isEditMode && this.courseId) {
      // 🛠 UPDATE MODE
      this.educationService.updateCourse(this.courseId, payload).subscribe({
        next: () => {
          this.toastr.success('Course updated successfully!');
          this.router.navigate(['/admin/course']);
        },
        error: (err) => {
          console.error('Error updating course:', err);
          this.toastr.error('Failed to update course. Please try again.');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      // ➕ ADD MODE
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
        },
        error: (err) => {
          console.error('Error adding course:', err);
          this.toastr.error('Failed to add course. Please try again.');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

}
