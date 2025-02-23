import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../../../shared/user/nav/nav.component";
import { FooterComponent } from "../../../shared/user/footer/footer.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  imports: [NavComponent,FooterComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder,private service:UserService,private toastr:ToastrService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.service.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          this.toastr.success('Message sent successfully!', 'Success');
          this.contactForm.reset(); // Reset the form after successful submission
        },
        error: (error) => {
          this.toastr.error('There was an error sending your message.', 'Error');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
      this.toastr.warning('Please fill out the form correctly.', 'Validation Error');
    }
  }
}
