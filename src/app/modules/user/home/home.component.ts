import { AfterViewInit, Component } from '@angular/core';
import { NavComponent } from "../../../shared/user/nav/nav.component";
import { FooterComponent } from "../../../shared/user/footer/footer.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CommonModule, NavComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  featuredColleges = [
    {
      name: 'Indian Institute of Science',
      location: 'Central Bengaluru',
      rating: '4.9',
      fees: '2.5',
      image: 'path/to/image.jpg'
    },
    // Add more colleges
  ];
}
