import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/user/user.routes').then(m => m.USER_ROUTES),
    data: { preload: true } // ✅ Preload only User Module
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    data: { preload: false } // ❌ No preloading for Admin
  },
  { path: '**', redirectTo: '/404' } // Fallback route
];

