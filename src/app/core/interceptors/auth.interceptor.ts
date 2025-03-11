import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if request is multipart/form-data
  const isMultipart = req.body instanceof FormData;

  const clonedRequest = req.clone({
    setHeaders: isMultipart
      ? {} // Don't set Content-Type for multipart requests
      : { 'Content-Type': 'application/json' },
  });

  console.log('HTTP Request:', clonedRequest);

  return next(clonedRequest);
};
