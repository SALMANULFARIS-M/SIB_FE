import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  sidebarCollapsed = false;
  openMenus = {
    analytics: false,
    team: false
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    // Close any open menus when collapsing sidebar
    if (this.sidebarCollapsed) {
      this.openMenus.analytics = false;
      this.openMenus.team = false;
    }
  }

  toggleMenu(menu: string): void {
    // Toggle the specified menu
    this.openMenus[menu as keyof typeof this.openMenus] = !this.openMenus[menu as keyof typeof this.openMenus];
  }
}
