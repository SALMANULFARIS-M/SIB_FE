import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-view-college',
  imports: [NavComponent, FooterComponent],
  templateUrl: './view-college.component.html',
  styleUrl: './view-college.component.css'
})
export class ViewCollegeComponent {

}
