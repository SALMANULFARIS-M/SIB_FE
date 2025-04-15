import { Component } from '@angular/core';
import { NavComponent } from '../../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../../shared/user/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EducationService } from '../../../../core/services/education.service';
import { College } from '../../../../shared/models/college';
import { Course } from '../../../../shared/models/course';
import { ApplyComponent } from '../../../../shared/user/apply/apply.component';

@Component({
  selector: 'app-view-course',
  imports: [NavComponent,FooterComponent,CommonModule,ApplyComponent],
  templateUrl: './view-course.component.html',
  styleUrl: './view-course.component.css'
})
export class ViewCourseComponent {
 course!: Course
  isLoading = false;
  constructor(private route: ActivatedRoute, private educationService: EducationService) { }
  ngOnInit() {
    this.isLoading = true;
    // Fetch 'id' from query params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.educationService.getCourseById(id).subscribe(
          {
            next: (response) => {
              this.course = response;;
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
  isObject(val: any): val is { name: string } {
    return val && typeof val === 'object' && 'name' in val;
  }

}
