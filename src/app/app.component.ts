import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd } from '@angular/router';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy {
  private mediaQueryListener!: (event: MediaQueryListEvent) => void; // Define the listener type
  showWhatsAppButton = true; // Default: show the button

  constructor(public spinner: NgxSpinnerService, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
    this.router.events.subscribe(() => {
      // Hide the button if the URL contains 'admin'
      this.showWhatsAppButton = !this.router.url.includes('/admin');
    });
   }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const initialSpinner = document.getElementById('initial-spinner');
      if (initialSpinner) {
        initialSpinner.style.display = 'none';
      }
      // ✅ Only access the router in the browser
      this.router?.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.spinner?.show();
        } else if (event instanceof NavigationEnd) {
          this.spinner?.hide();
        }
      });

      const toTopButton = document.getElementById("to-top-button") as HTMLElement;
      // Scroll event listener (only in browser)
      window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
          toTopButton?.classList.remove("hidden");
        } else {
          toTopButton?.classList.add("hidden");
        }
      });
      // Set favicon dynamically
      this.setFavicon();
      // Listen for dark mode changes
      this.mediaQueryListener = () => this.setFavicon();
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', this.mediaQueryListener);
    }
  }

  goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.mediaQueryListener);
    }
  }

  setFavicon(): void {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      favicon.href = '/icon-w.png'; // Path to your dark mode favicon in the public directory
    } else {
      favicon.href = '/logo-b.png'; // Path to your light mode favicon in the public directory
    }
  }




}
