import { provideRouter, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from '../../auth/admin-login/admin-login.component';
import { authGuard } from '../../core/guards/auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { AddblogsComponent } from './blogs/addblogs/addblogs.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'blogs-list', component: BlogsComponent, canActivate: [authGuard] },
  { path: 'blogs-list/blog-add', component: AddblogsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' } // Handle invalid admin routes
];

