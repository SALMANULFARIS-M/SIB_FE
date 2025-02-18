import { Component } from '@angular/core';
import { NavComponent } from "../../../shared/user/nav/nav.component";
import { FooterComponent } from "../../../shared/user/footer/footer.component";

@Component({
  selector: 'app-contact',
  imports: [NavComponent,FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
