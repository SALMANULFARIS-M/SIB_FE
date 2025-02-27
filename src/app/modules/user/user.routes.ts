import { Routes } from '@angular/router';
import {HomeComponent } from './home/home.component';
import {AboutComponent } from './about/about.component';
import {ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';


export const USER_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'apply', component: HomeComponent },
  { path: 'blogs', component: BlogComponent },

];
