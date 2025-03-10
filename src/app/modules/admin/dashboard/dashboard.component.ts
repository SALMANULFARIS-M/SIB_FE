import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/admin/sidebar/sidebar.component';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  sidebarCollapsed = false;

  constructor(private service: AdminService) {
    this.service.collapsedState.subscribe((state) => {
      this.sidebarCollapsed = state;
    });
  }
  ngOnInit(): void {
    // Initialize component
  }

}
