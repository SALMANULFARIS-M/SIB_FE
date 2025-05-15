import { Component } from '@angular/core';
import { NavComponent } from '../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-terms',
  imports: [NavComponent,FooterComponent],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css'
})
export class TermsComponent {

}
