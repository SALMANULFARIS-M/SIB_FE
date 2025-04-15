import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/user/footer/footer.component';
import { NavComponent } from '../../../shared/user/nav/nav.component';
import { EducationService } from '../../../core/services/education.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { University } from '../../../shared/models/university';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-university',
  imports: [NavComponent, FooterComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './university.component.html',
  styleUrl: './university.component.css'
})
export class UniversityComponent {
  universities: University[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 6;
  searchQuery = '';
  isLoading = true;
  constructor(private educationService: EducationService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUniversities();
  }

  fetchUniversities(): void {
    this.educationService.getUniversities({ page: this.currentPage, limit: this.limit, search: this.searchQuery }).subscribe({
      next: (response) => {
        this.universities = response.universities;
        this.totalPages = response.pagination.totalPages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching universities', error);
        this.isLoading = false;
      }
    });
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchUniversities();
    }
  }

  onSearchChange(): void {
    this.currentPage = 1; // Reset to the first page when search changes
    this.fetchUniversities();
  }

  viewColleges(universityId: string): void {
    this.router.navigate(['/colleges'], { queryParams: { universityId } });
  }

}
