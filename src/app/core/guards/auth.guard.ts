import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const toastr = inject(ToastrService); // ✅ Inject ToastrService
  // ✅ Check if running on the browser before accessing localStorage
  // ✅ Ensure running in the browser before accessing localStorage
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      toastr.error('You need to login first', 'Access Denied');
      router.navigate(['/admin/login']); // Redirect unauthorized users
      return false;
    }

    try {
      // ✅ Decode the token and check expiration
      const decodedToken: any = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem('adminToken');
        toastr.warning('Session expired, please login again', 'Token Expired');
        router.navigate(['/admin/login']); // Redirect expired users

        return false;
      }

      return true; // ✅ Valid token, allow access
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('adminToken');
      toastr.error('Invalid session, please login again', 'Authentication Error');
      router.navigate(['/admin/login']); // Redirect if token is invalid
      return false;
    }
  }

  return false; // Deny access in SSR mode
};
