import { Routes } from '@angular/router';
import {HomeComponent } from './home/home.component';
import {AboutComponent } from './about/about.component';
import {ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';
import { UniversityComponent } from './university/university.component';
import { CollegeComponent } from './college/college.component';
import { CourseComponent } from './course/course.component';
import { ViewCollegeComponent } from './college/view-college/view-college.component';
import { ViewCourseComponent } from './course/view-course/view-course.component';


export const USER_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'apply', component: HomeComponent },
  { path: 'counselling', component: HomeComponent },
  { path: 'universities', component: UniversityComponent },
  { path: 'colleges', component: CollegeComponent },
  { path: 'college-details', component: ViewCollegeComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'course-details', component: ViewCourseComponent },
  { path: 'blogs', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailsComponent, }
];
