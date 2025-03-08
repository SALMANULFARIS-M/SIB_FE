import { Component } from '@angular/core';
import { Blog } from '../../user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { NavComponent } from '../../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../../shared/user/footer/footer.component';

@Component({
  selector: 'app-blog-details',
  imports: [NavComponent,FooterComponent],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent {
   blogs: Blog =
    {
      id: 1,
      title: 'Designing a functional workflow at home',
      content: 'This is the full content of the blog. Duis aute irure dolor...',
      image: 'https://growthists.com/wp-content/uploads/2025/01/importance-of-distance-education.webp',
      date: 'Mar 1, 2025'
    }

  constructor(private route: ActivatedRoute, private service:UserService , private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.blog = this.service.getBlogById(id);

    // if (!this.blog) {
    //   this.router.navigate(['/']); // Redirect if blog not found
    // }
  }
}
