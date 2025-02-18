import { Component } from '@angular/core';

import { NavComponent } from "../../../shared/user/nav/nav.component";
import { FooterComponent } from "../../../shared/user/footer/footer.component";

@Component({
  selector: 'app-about',
  imports: [NavComponent,FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
