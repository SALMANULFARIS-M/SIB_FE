import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';
import { EducationService } from '../../../core/services/education.service';
import { Course } from '../../../shared/models/course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  imports: [NavComponent, FooterComponent,CommonModule,FormsModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  courses: Course[] = [];
  searchQuery = '';
  selectedLevel = 'All';
  isLoading = true;

  // Pagination
  currentPage = 1;
  totalPages = 1;
  limit = 6; // items per page

  constructor(private educationService: EducationService,private route:ActivatedRoute) {}

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      const type = params.get('type');
      this.fetchCourses(type || undefined); // pass 'online', 'short-term', or undefined
    });
  }

  fetchCourses(type?: string): void {
    this.isLoading = true;

    const filters: any = {
      search: this.searchQuery,
      level: this.selectedLevel !== 'All' ? this.selectedLevel : '',
      page: this.currentPage,
      limit: this.limit,
    };

    // Add type to filters if it's 'online' or 'short-term'
    if (type === 'online' || type === 'short-term') {
      filters.type = type;
    }

    this.educationService.getCourses(filters).subscribe({
      next: (res) => {
        this.courses = res.courses;
        this.totalPages = Math.ceil(res.totalCount / this.limit); // Adjust based on backend response
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.isLoading = false;
      }
    });
  }


  onSearchChange(): void {
    this.currentPage = 1;
    this.fetchCourses();
  }

  filterByLevel(level: string): void {
    this.selectedLevel = level;
    this.currentPage = 1;
    this.fetchCourses();
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.fetchCourses();
  }
}
