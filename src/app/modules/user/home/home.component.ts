import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavComponent } from "../../../shared/user/nav/nav.component";
import { FooterComponent } from "../../../shared/user/footer/footer.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { faUniversity, faSchool, faBookOpen, faGlobe, faBriefcase, faLaptop, faHome, faBuilding, faCalendarAlt, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApplyComponent } from '../../../shared/user/apply/apply.component';
import { FreeConsultaionComponent } from './free-consultaion/free-consultaion.component';
import { fadeIn, slideInFromLeft, slideInFromRight, staggerFadeIn, zoomIn } from '../../../shared/constants/animation';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavComponent, FooterComponent, FontAwesomeModule, ApplyComponent, FreeConsultaionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeIn, slideInFromLeft, slideInFromRight, staggerFadeIn, zoomIn]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('headerContainer') headerContainer!: ElementRef;
  @ViewChild('leftContent') leftContent!: ElementRef;
  @ViewChild('rightImage') rightImage!: ElementRef;

  // Animation state properties
  headerVisible = false;
  rightImageVisible = false;
  leftContentVisible = false;

  intervalId: any;
  currentSlide = 0;
  opportunities = [
    { label: 'Universities', icon: faUniversity },
    { label: 'Colleges', icon: faSchool },
    { label: 'Online Courses', icon: faGlobe },
    { label: 'Offline Courses', icon: faBookOpen },
    { label: 'Short-term Programs', icon: faLaptop },
    { label: 'Part-time Jobs', icon: faBriefcase },
    { label: 'Accommodation Near Me', icon: faHome },
    { label: 'Events', icon: faCalendarAlt },
    { label: '1-on-1 Free Counselling', icon: faComments },
    { label: 'Internships', icon: faBuilding }
  ];
  slides = [
    { image: '/img_1.JPG', text: 'With Chairman of Ique Ventures', alt: 'Slide 1' },
    { image: '/img_2.JPG', text: 'Founder of Study In Bengaluru', alt: 'Slide 2' },
    { image: '/img_3.JPG', text: 'Receiving Award for best admission consultants', alt: 'Slide 3' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver(this.headerContainer.nativeElement, 'headerVisible');
      // this.setupIntersectionObserver(this.leftContent.nativeElement, 'leftContentVisible');
      // this.setupIntersectionObserver(this.rightImage.nativeElement, 'rightImageVisible');
      this.startAutoSlide();
    }
  }

  setupIntersectionObserver(element: HTMLElement, animationState: 'headerVisible'): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this[animationState] = true;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(element);
  }

}
