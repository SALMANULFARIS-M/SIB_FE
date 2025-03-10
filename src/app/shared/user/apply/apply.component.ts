// Apply Form Component (Angular TS)
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { STATES } from '../../constants/states';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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

  constructor(private fb: FormBuilder, private service: UserService, private toastr: ToastrService) { }

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
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.applyForm.reset();
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
