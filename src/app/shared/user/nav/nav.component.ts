import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-nav',
  imports: [CommonModule,RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  isMenuOpen: boolean = false;
  isScrolled: boolean = false;
  menuItems: string[] = ['Home', 'Services', 'About', 'Contact'];
  constructor() {}
// In your component
ngOnInit(): void {
  gsap.from('.logo-morph', { opacity: 0, y: -20, duration: 1, delay: 0.5 });
}
   // Toggle mobile menu
   toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Handle scroll event
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }
}
