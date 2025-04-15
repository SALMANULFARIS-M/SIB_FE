import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavComponent } from "../../../shared/user/nav/nav.component";
import { FooterComponent } from "../../../shared/user/footer/footer.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApplyComponent } from '../../../shared/user/apply/apply.component';
import { FreeConsultaionComponent } from './free-consultaion/free-consultaion.component';
import { fadeIn, fadeInSequential, fadeInUp, flipText, listAnimation, scaleUp, slideInFromLeft, slideInFromRight, slideUp, staggerFadeIn, zoomIn } from '../../../shared/constants/animation';
import { faUniversity, faSchool, faBookOpen, faGlobe, faBriefcase, faLaptop, faHome, faBuilding, faCalendarAlt, faComments } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent, FontAwesomeModule, ApplyComponent, FreeConsultaionComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeIn, slideInFromLeft, fadeInUp, scaleUp, slideInFromRight,
    staggerFadeIn, zoomIn, slideUp, listAnimation, fadeInSequential, flipText]
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('secondHeading', { static: false }) secondHeading!: ElementRef;
  @ViewChild('freeConsultation', { static: false }) freeConsultation!: ElementRef;
  @ViewChild('leftContent', { static: false }) leftContent!: ElementRef;
  @ViewChild('rightImage', { static: false }) rightImage!: ElementRef;
  @ViewChild('countUp', { static: false }) countUp!: ElementRef;
  @ViewChild('opportunitySection', { static: false }) opportunitySection!: ElementRef;
  @ViewChild('visionAndMission') visionAndMission!: ElementRef;
  @ViewChild('rightCarousel') rightCarousel!: ElementRef;
  @ViewChild('journey') journey!: ElementRef;

  // UI Control Properties
  flipState: 'normal' | 'flipped' = 'normal';
  showCouncilingComponent = false;
  showApplyComponent = false;
  isVisionFlipped = false;
  isMissionFlipped = false;

  // Animation state properties
  headerVisible = false;
  rightImageVisible = false;
  leftContentVisible = false;
  counterVisible: boolean[] = []; // Initialize as boolean array
  currentValues: number[] = [];
  opportunityVisible: boolean[] = [];
  intervalId: any;
  currentSlide = 0;
  cardVisible = false
  leftVisible = false;
  rightVisible = false;
  journeyVisible = false;
  blogs: any[] = [];

  stats = [
    { value: 100, label: 'Partner Colleges', prefix: '+' },
    { value: 1000, label: 'Students Enrolled', prefix: '+' },
    { value: 95, label: 'Admission Success', prefix: '%' },
    { value: 50, label: 'Franchises', prefix: '+' },
    { value: '24/7', label: 'Student Support', prefix: '' },
  ];

  opportunities = [
    { label: 'Universities', icon: faUniversity, route: '/universities' },
    { label: 'Colleges', icon: faSchool, route: '/colleges' },
    { label: 'Courses', icon: faGlobe, route: '/courses' },
    { label: 'online Courses', icon: faBookOpen, route: '/online' },
    { label: 'Short-term Programs', icon: faLaptop, route: '/Short-term' },
    { label: 'Part-time Jobs', icon: faBriefcase, route: '/' },
    { label: 'Accommodation Near Me', icon: faHome, route: '/' },
    { label: 'Events', icon: faCalendarAlt, route: '/' },
    { label: '1-on-1 Free Counselling', icon: faComments, route: '/counselling' },
    { label: 'Internships', icon: faBuilding, route: '/' }
  ];



  constructor(@Inject(PLATFORM_ID) private platformId: any, private router: Router, private service: UserService,
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // ✅ Step 1: Check URL on initial load
      this.updateComponentVisibility(this.router.url);

      // ✅ Step 2: Detect URL changes
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.updateComponentVisibility(event.urlAfterRedirects);
        });

      this.startFlipAnimation();

      // Initialize counterVisible and currentValues arrays
      this.counterVisible = new Array(this.stats.length).fill(false);
      this.currentValues = new Array(this.stats.length).fill(0);
      this.opportunityVisible = new Array(this.opportunities.length).fill(false);
      this.service.latestBlogs().subscribe({
        next: (response) => {
          this.blogs = response;
        },
        error: (err) => {
        }
      });
    }
  }

  navigateTo(route: string) {
    if (route === 'online') {
      this.router.navigate(['/courses'], { queryParams: { type: 'online' } });
    } else if (route === 'short-term') {
      this.router.navigate(['/courses'], { queryParams: { type: 'short-term' } });
    } else {
      this.router.navigate([route]);
    }
  }



  updateComponentVisibility(url: string): void {
    const currentUrl = url.split('?')[0]; // Normalize URL (Remove query params)
    this.showApplyComponent = currentUrl === '/apply';
    this.showCouncilingComponent = currentUrl === '/counselling';
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (this.secondHeading?.nativeElement) {
          this.setupIntersectionObserver(this.secondHeading.nativeElement, 'headerVisible');
        }
        if (this.freeConsultation?.nativeElement) {
          this.setupIntersectionObserver(this.freeConsultation.nativeElement, 'headerVisible');
        }
        if (this.leftContent?.nativeElement) {
          this.setupIntersectionObserver(this.leftContent.nativeElement, 'leftContentVisible');
        }
        if (this.rightImage?.nativeElement) {
          this.setupIntersectionObserver(this.rightImage.nativeElement, 'rightImageVisible');
        }
        if (this.countUp?.nativeElement) {
          this.setupIntersectionObserver(this.countUp.nativeElement, 'countupSectionVisible');
        } if (this.opportunitySection?.nativeElement) {
          this.setupIntersectionObserver(this.opportunitySection.nativeElement, 'opportunityVisible');
        }
        if (this.leftContent?.nativeElement) {
          this.setupIntersectionObserver(this.leftContent.nativeElement, 'leftContentVisible');
        }
        if (this.rightImage?.nativeElement) {
          this.setupIntersectionObserver(this.rightImage.nativeElement, 'rightImageVisible');
        }
        if (this.visionAndMission?.nativeElement) {
          this.setupIntersectionObserver(this.visionAndMission.nativeElement, 'leftVisible');
        }
        if (this.rightCarousel?.nativeElement) {
          this.setupIntersectionObserver(this.rightCarousel?.nativeElement, 'rightVisible');
        }
        if (this.journey?.nativeElement) {
          this.setupIntersectionObserver(this.journey?.nativeElement, 'journeyVisible');
        }
      }, 500);
    }
  }
  startFlipAnimation(): void {
    setInterval(() => {
      this.flipState = this.flipState === 'normal' ? 'flipped' : 'normal';
    }, 4000); // Change text every 4 seconds
  }

  setupIntersectionObserver(element: HTMLElement, animationState: string, index?: number): void { // animationState is now string
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (animationState === 'countupSectionVisible') {
              this.counterVisible.fill(true);
              this.stats.forEach((_, statIndex) => this.animateCounter(statIndex));
            } else if (animationState === 'opportunityVisible') {
              this.animateOpportunities();
            } else {
              (this as any)[animationState] = true;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.3, // Adjust threshold to control when animation triggers
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(element);
  }

  private animateCounter(index: number): void {
    const targetValue = Number(this.stats[index].value);
    if (!isNaN(targetValue)) {
      const duration = 1500; // Animation duration in ms
      const step = targetValue / (duration / 20);
      let current = 0;

      const interval = setInterval(() => {
        current += step;
        if (current >= targetValue) {
          this.currentValues[index] = targetValue;
          clearInterval(interval);
        } else {
          this.currentValues[index] = Math.floor(current);
        }
      }, 20);
    } else {
      this.currentValues[index] = this.stats[index].value as unknown as number;
    }
  }
  animateOpportunities(): void {
    this.opportunities.forEach((_, index) => {
      setTimeout(() => {
        this.opportunityVisible[index] = true;
      }, index * 200);
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }



  goToSlide(index: number): void {
    this.currentSlide = index;
  }
  toggleFlip(section: string): void {
    if (section === 'vision') {
      this.isVisionFlipped = !this.isVisionFlipped;
    } else if (section === 'mission') {
      this.isMissionFlipped = !this.isMissionFlipped;
    }
  }


}

