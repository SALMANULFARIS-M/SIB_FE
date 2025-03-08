import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword!: boolean
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
@Inject(PLATFORM_ID) private platformId: any
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]]
    });
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('adminToken');
      if (token) {
        this.router.navigate(['/admin/dashboard']);
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.toastr.warning('Please fill in the required fields correctly', 'Validation Error');
      return;
    }

    const adminData = this.loginForm.value;

    this.authService.adminLogin(adminData).subscribe({
      next: (response) => {
        localStorage.setItem('adminToken', response.token);
        this.toastr.success('Login Successful', 'Welcome Admin');
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Invalid Credentials', 'Login Failed');
      }
    });
  }
}
