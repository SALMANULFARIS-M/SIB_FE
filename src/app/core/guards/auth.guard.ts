import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ Check if running on the browser before accessing localStorage
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.navigate(['/admin']);
      return false;
    }
    return true;
  }

  return false; // Deny access in SSR mode
};
