import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-view-course',
  imports: [NavComponent,FooterComponent],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent {

}
