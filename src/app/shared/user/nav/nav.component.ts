import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  isMenuOpen: boolean = false;
  isScrolled: boolean = false;
  constructor(private router:Router) { }
  // In your component
  ngOnInit(): void {
  }
  // Toggle mobile menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isBlogActive(): boolean {
    return this.router.url.startsWith('/blog');
  }

  // Handle scroll event
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }
}

