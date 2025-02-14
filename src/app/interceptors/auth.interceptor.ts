// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      // Add your authorization token if needed
      // 'Authorization': `Bearer ${yourToken}`
    },
  });

  // Log the request (optional)
  console.log('HTTP Request:', clonedRequest);

  // Pass the cloned request instead of the original request to the next handle
  return next(clonedRequest);
};
