import { Component, ElementRef, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
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
  styleUrl: './free-consultaion.component.css',
  animations: [slideInFromRight]
})
export class FreeConsultaionComponent {
  applyForm!: FormGroup;
  showForm = false;
  states = STATES;
  districts: string[] = [];
  @HostBinding('@slideInFromRight') get slideIn() {
    return true; // 🔥 Only trigger when visible
  }
  private observer!: IntersectionObserver;
  isVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private fb: FormBuilder, private service: UserService,private toastr: ToastrService,private el: ElementRef) { }

  ngOnInit(): void {
    this.applyForm = this.fb.group({
      name: ['', Validators.required],
      course: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      district: ['', Validators.required],
    });

    if (isPlatformBrowser(this.platformId) && 'IntersectionObserver' in window) {

      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
console.log("dsf");

          this.isVisible = true;
          this.observer.disconnect();
        }
      }, { threshold: 0.5 });

      this.observer.observe(this.el.nativeElement);
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
