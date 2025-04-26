import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../../shared/user/nav/nav.component';
import { FooterComponent } from '../../../shared/user/footer/footer.component';
import { StarRatingComponent } from '../../../shared/user/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../../core/services/education.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { College } from '../../../shared/models/college';

@Component({
  imports: [NavComponent, FooterComponent, StarRatingComponent, CommonModule, FormsModule,RouterModule],
  templateUrl: './college.component.html',
  styleUrl: './college.component.css'
})
export class CollegeComponent implements OnInit {
  colleges: College[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 6;
  searchQuery = '';
  selectedCategory = 'All';
  isLoading = true;
  universityId: string | null = null;

  constructor(private educationService: EducationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.universityId = params.get('universityId');
      if (this.universityId) {
        // fetch colleges under this university
        this.fetchCollegesByUniversity(this.universityId, this.currentPage, this.limit, this.searchQuery, this.selectedCategory);
      } else {
        // fetch all colleges
        this.fetchColleges();
      }
    });
  }

  fetchColleges(): void {
    this.isLoading = true;
    this.educationService.getColleges({
      page: this.currentPage,
      limit: this.limit,
      search: this.searchQuery,
      category: this.selectedCategory
    }).subscribe({
      next: (response) => {
        this.colleges = response.colleges;
        this.totalPages = response.pagination.totalPages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching colleges', error);
        this.isLoading = false;
      }
    });
  }
  fetchCollegesByUniversity(id: string, page: number, limit: number, search: string, category: string): void {
    this.isLoading = true;

    this.educationService.getUniversityWithColleges(id, { page, limit, search }).subscribe({
      next: (response) => {
        this.colleges = response.colleges;
        this.totalPages = response.pagination?.totalPages || 1;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }



  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchColleges();
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.fetchColleges();
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.fetchColleges();
  }
  getRotatedCategoryColor(index: number): string {
    const colors = [
      'bg-violet-200 text-[#8E4CCB]',
      'bg-green-200 text-green-800',
      'bg-yellow-200 text-yellow-800',
      'bg-blue-200 text-blue-800',
      'bg-pink-200 text-pink-800'
    ];
    return colors[index % colors.length];
  }


}
