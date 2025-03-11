import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { STATES } from '../../../../shared/constants/states';
import { UserService } from '../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { slideInFromRight } from '../../../../shared/constants/animation';

@Component({
  selector: 'app-free-consultaion',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './free-consultaion.component.html',
  styleUrls: ['./free-consultaion.component.css'],
  animations: [slideInFromRight],
})
export class FreeConsultaionComponent implements OnInit, AfterViewInit {
  applyForm!: FormGroup;
  showForm = false;
  states = STATES;
  districts: string[] = [];
 @Input() visible = false; // Control animation from parent
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private fb: FormBuilder, private service: UserService, private toastr: ToastrService, private el: ElementRef) { }

  ngOnInit(): void {
    this.applyForm = this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      district: ['', Validators.required],
    });
  // Example: Trigger the animation after a delay
   // Ensure animation runs when visible is true
   setTimeout(() => {
    this.visible = true;
  }, 200);

  }
  ngAfterViewInit(): void {

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
      this.service.freeCounsiling(this.applyForm.value).subscribe({
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
