// Apply Form Component (Angular TS)
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { STATES  } from '../../constants/states';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'app-apply',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.css'
})
export class ApplyComponent {
applyForm!: FormGroup;
  showForm = false;
  states = STATES;
  districts: string[] = [];

  constructor(private fb: FormBuilder,private service:UserService) {}

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
      this.service.apply(this.applyForm.value).subscribe(
        (response) => {
          alert('Form submitted successfully!${response}',);

        },
        (error) => {
          alert('There was an error submitting the form.');
        }
      );
      alert('Form submitted successfully!');
    } else {
      this.applyForm.markAllAsTouched();
    }
  }
}
