import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLoginComponent } from '../../auth/admin-login/admin-login.component';
import { authGuard } from '../../core/guards/auth.guard';
import { BlogsComponent } from './blogs/blogs.component';
import { AddblogsComponent } from './blogs/addblogs/addblogs.component';
import { UniversityComponent } from './university/university.component';
import { CollegeComponent } from './college/college.component';
import { CourseComponent } from './course/course.component';
import { AdduniversityComponent } from './university/adduniversity/adduniversity.component';
import { AddcollegeComponent } from './college/addcollege/addcollege.component';
import { AddcourseComponent } from './course/addcourse/addcourse.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'university', component: UniversityComponent, canActivate: [authGuard] },
  { path: 'university/add-university', component: AdduniversityComponent, canActivate: [authGuard] },
  { path: 'university/edit/:id', component: AdduniversityComponent, canActivate: [authGuard] },
  { path: 'college', component: CollegeComponent, canActivate: [authGuard] },
  { path: 'college/add-college', component: AddcollegeComponent },
  { path: 'course', component: CourseComponent, canActivate: [authGuard] },
  { path: 'course/add-course', component: AddcourseComponent, canActivate: [authGuard] },
  { path: 'course/edit/:id', component: AddcourseComponent, canActivate: [authGuard] },
  { path: 'blogs-list', component: BlogsComponent, canActivate: [authGuard] },
  { path: 'blogs-list/blog-add', component: AddblogsComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' } // Handle invalid admin routes
];

// canActivate: [authGuard]
