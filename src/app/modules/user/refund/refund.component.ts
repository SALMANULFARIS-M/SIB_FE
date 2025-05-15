import { Component } from '@angular/core';
import { NavComponent } from '../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-refund',
  imports: [NavComponent,FooterComponent,RouterModule],
  templateUrl: './refund.component.html',
  styleUrl: './refund.component.css'
})
export class RefundComponent {

}
