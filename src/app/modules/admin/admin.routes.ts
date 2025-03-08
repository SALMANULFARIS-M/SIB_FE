import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from '../../auth/admin-login/admin-login.component';
import { authGuard } from '../../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminLoginComponent   },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: '' } // Handle invalid admin routes
];

