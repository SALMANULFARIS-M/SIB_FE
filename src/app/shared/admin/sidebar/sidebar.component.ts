import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarCollapsed = false;
  isLargeScreen = true; // Track screen size
  openMenus = {
    analytics: false,
    team: false
  };
  isMobile = false;
  constructor(private service: AdminService, @Inject(PLATFORM_ID) private platformId: object,
  ) {
    // Listen for sidebar collapse changes
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize(); // Initial check
      this.service.collapsedState.subscribe((state) => {
        this.sidebarCollapsed = state;
      });
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const screenWidth = window.innerWidth;
      this.isLargeScreen = screenWidth >= 640; // Define mobile breakpoint
      this.isMobile = screenWidth < 640;
      if (this.isMobile&& !this.sidebarCollapsed) {
        this.service.setSidebarState(true); // Use service to update state
      }else{
        this.service.setSidebarState(false);

      }
    }
  }


  toggleSidebar(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.isMobile) {
        this.service.toggleSidebar();
        // Close any open menus when collapsing sidebar
        if (this.sidebarCollapsed) {
          this.openMenus.analytics = false;
          this.openMenus.team = false;
        }
      }
    }
  }

  toggleMenu(menu: string): void {
    // Toggle the specified menu
    this.openMenus[menu as keyof typeof this.openMenus] = !this.openMenus[menu as keyof typeof this.openMenus];
  }
}
