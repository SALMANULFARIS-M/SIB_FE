import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../../shared/user/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../../../../shared/user/star-rating/star-rating.component';
import { EducationService } from '../../../../core/services/education.service';
import { College } from '../../../../shared/models/college';
import { log } from 'util';
import { ApplyComponent } from '../../../../shared/user/apply/apply.component';

@Component({
  selector: 'app-view-college',
  imports: [NavComponent, FooterComponent, CommonModule, RouterModule, StarRatingComponent,ApplyComponent],
  templateUrl: './view-college.component.html',
  styleUrl: './view-college.component.css'
})
export class ViewCollegeComponent {
  college!: College
  isLoading = false;
  constructor(private route: ActivatedRoute, private educationService: EducationService) { }
  ngOnInit() {
    this.isLoading = true;
    // Fetch 'id' from query params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.educationService.getCollegeById(id).subscribe(
          {
            next: (response) => {
              this.college = response;;
              this.isLoading = false;
            },
            error: (error) => {
              this.isLoading = false;
            }
          }
        );
      } else {
        this.isLoading = false;
      }
    });
  }

}
