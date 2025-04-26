// Apply Form Component (Angular TS)
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { STATES } from '../../constants/states';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-apply',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.css'
})

export class ApplyComponent implements OnInit {
  @Input() showApply: boolean = false; // Receive visibility status
  applyForm!: FormGroup;
  showForm = false;
  states = STATES;
  districts: string[] = [];
  applyTimer: any = null; // Timer for auto-showing the form
  constructor(@Inject(PLATFORM_ID) private platformId: any, private router:Router, private fb: FormBuilder, private service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.applyForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      district: ['', Validators.required],
      course: ['', Validators.required],
      college: ['', Validators.required]
    });
    if (this.showApply) {
      this.showForm = true;
    }
    if (isPlatformBrowser(this.platformId)) {
      const formShown = localStorage.getItem('formTimerShown');

      if (!formShown) {
        // Set a timeout to show the form after 12 seconds
        this.applyTimer = setTimeout(() => {
          this.showForm = true;
          localStorage.setItem('formTimerShown', 'true');

          // Set another timeout to remove the formTimerShown after 5 hours
          const formTimerExpiry = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
          setTimeout(() => {
            localStorage.removeItem('formTimerShown');
          }, formTimerExpiry);

        }, 12000); // Show after 12 seconds
      }

    }
  }


  openForm(): void {
    const formTimerExpiry = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

    // If form was shown previously, cancel the timer to show the form early
    if (this.applyTimer) {
      clearTimeout(this.applyTimer); // cancel timer if user clicks early
    }

    // Show the form immediately
    this.showForm = true;

    // Store the form shown flag
    localStorage.setItem('formTimerShown', 'true');

    // Set the timer to automatically remove the formTimerShown after 5 hours
    setTimeout(() => {
      localStorage.removeItem('formTimerShown');
    }, formTimerExpiry);

  }


  closeForm(): void {
    this.showForm = false;
    this.applyForm.reset();
    this.router.navigate(['/']);
  }

  onStateChange(): void {
    const selectedState = this.applyForm.get('state')?.value;
    const stateObj = this.states.find(s => s.state === selectedState); // Updated to match 'state' key
    this.districts = stateObj ? stateObj.districts : [];
    this.applyForm.get('district')?.setValue('');
  }

  submitForm(): void {
    if (this.applyForm.valid) {
      this.service.apply(this.applyForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            this.toastr.success(`Form submitted successfully!`, 'Success');
          }
        },
        error: (error) => {
          this.toastr.error('There was an error submitting the form.', 'Error');
        }
      });
      this.closeForm();
    } else {
      this.applyForm.markAllAsTouched();
      this.toastr.warning('Please fill out the form correctly.', 'Validation Error');
    }
  }
}
