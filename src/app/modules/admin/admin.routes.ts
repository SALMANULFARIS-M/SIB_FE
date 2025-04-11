import {  Routes } from '@angular/router';
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
  { path: 'dashboard', component: DashboardComponent  },
  { path: 'university', component: UniversityComponent  },
  { path: 'university/add-university', component: AdduniversityComponent  },
  { path: 'college', component: CollegeComponent  },
  { path: 'college/add-college', component: AddcollegeComponent  },
  { path: 'course', component: CourseComponent  },
  { path: 'course/add-course', component: AddcourseComponent  },
  { path: 'blogs-list', component: BlogsComponent  },
  { path: 'blogs-list/blog-add', component: AddblogsComponent  },
  { path: '**', redirectTo: 'dashboard' } // Handle invalid admin routes
];

// canActivate: [authGuard]
