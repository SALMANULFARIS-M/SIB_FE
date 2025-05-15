import { Component } from '@angular/core';
import { NavComponent } from '../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-privacy',
  imports: [NavComponent,FooterComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
export class PrivacyComponent {

}
