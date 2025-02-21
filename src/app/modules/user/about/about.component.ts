import { Component } from '@angular/core';

import { NavComponent } from "../../../shared/user/nav/nav.component";
import { FooterComponent } from "../../../shared/user/footer/footer.component";
import { ApplyComponent } from '../../../shared/user/apply/apply.component';

@Component({
  selector: 'app-about',
  imports: [NavComponent,FooterComponent,ApplyComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
