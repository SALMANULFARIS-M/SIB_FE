import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavComponent } from "../../../shared/user/nav/nav.component";
import { FooterComponent } from "../../../shared/user/footer/footer.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GsapService } from '../../../core/services/gsap.service';
import { faUniversity, faSchool, faBookOpen, faGlobe, faBriefcase, faLaptop, faHome, faBuilding, faCalendarAlt, faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NavComponent, FooterComponent, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements AfterViewInit {
  @ViewChild('headerContainer') headerContainer!: ElementRef;
  @ViewChild('firstHeading') firstHeading!: ElementRef;
  @ViewChild('secondHeading') secondHeading!: ElementRef;
  @ViewChild('leftContent', { static: true }) leftContent!: ElementRef;
  @ViewChild('rightImage', { static: true }) rightImage!: ElementRef;
  @ViewChild('gridContainer', { static: false }) gridContainer!: ElementRef;
  @ViewChildren('countup') countupElements!: QueryList<ElementRef>;
  @ViewChildren('descText') descTextElements!: QueryList<ElementRef>; // Capture desc-text elements using ViewChildren
  @ViewChildren('specialText') specialTextElements!: QueryList<ElementRef>; // Capture special-text elements using ViewChildren

  gsap: any;
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


  constructor(
    private gsapService: GsapService,
    @Inject(PLATFORM_ID) private platformId: any // Inject platform ID to detect if running on the browser
  ) {
    this.gsap = this.gsapService.getGsap();
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.gsap) {
      this.animateHeaders();
      this.animateTwo();
      this.animateStatic();
      this.animateOpportunities();
    }
  }

  featuredColleges = [
    {
      name: 'Indian Institute of Science',
      location: 'Central Bengaluru',
      rating: '4.9',
      fees: '2.5',
      image: 'path/to/image.jpg'
    },
    // Add more colleges
  ];

  private animateHeaders() {
    this.gsap.set([this.firstHeading.nativeElement, this.secondHeading.nativeElement], {
      opacity: 0,
      y: 50,
      scale: 0.95,
      filter: 'blur(10px)',
      letterSpacing: '0.2em'
    });

    this.gsap.to([this.firstHeading.nativeElement, this.secondHeading.nativeElement], {
      duration: 1.5,
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      letterSpacing: '0em',
      ease: 'power3.out',
      stagger: 0.3,
      delay: 0.2
    });
  }

  private animateTwo() {
    this.gsap.from(this.leftContent.nativeElement, {
      opacity: 0,
      x: -100,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.leftContent.nativeElement,
        start: "top 80%", // Trigger when 80% of the element is in view
        toggleActions: "play none none none",
      }
    });

    this.gsap.from(this.rightImage.nativeElement, {
      opacity: 0,
      x: 100,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.rightImage.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    this.gsap.to(this.leftContent.nativeElement, {
      y: '+=10',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: this.leftContent.nativeElement,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });
  }

  animateStatic() {
    // Flag to check if the count-up animation has already run
    let hasAnimated = false;

    this.countupElements.forEach((elementRef) => {
      const element = elementRef.nativeElement;
      const endValue = element.dataset.value;
      const suffix = element.textContent.replace(/^0/, ''); // Get the suffix (+/K+/%)

      // Create a ScrollTrigger instance
      this.gsap.fromTo(element, {
        color: '#2D1044', // Start with background color
        innerText: 0
      }, {
        color: '#FFD700', // Animate to gold color
        innerText: endValue,
        duration: 4,
        ease: 'power1.out',
        snap: { innerText: 1 },
        onUpdate: function () {
          element.textContent = Math.floor(this['targets']()[0].innerText) + suffix;
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reset',
          onEnter: () => {
            if (!hasAnimated) {
              hasAnimated = true; // Set the flag to true
              this.gsap.to(element, { // Start the animation
                innerText: endValue,
                duration: 4,
                ease: 'power1.out',
                snap: { innerText: 1 },
                onUpdate: function () {
                  element.textContent = Math.floor(this['targets']()[0].innerText) + suffix;
                }
              });
            }
          }
        }
      });
    });

    // Animate special 24/7 text
    this.specialTextElements.forEach((elementRef) => {
      const element = elementRef.nativeElement;
      this.gsap.from(element, {
        opacity: 0,
        scale: 0.3,
        color: '#2D1044',
        duration: 2,
        ease: 'elastic.out(1.2, 0.5)',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true // This will ensure it only animates once
        }
      });
    });

    // Animate description texts
    this.descTextElements.forEach((elementRef) => {
      const text = elementRef.nativeElement;
      this.gsap.from(text, {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'power2.out', // Slower fade-in
        scrollTrigger: {
          trigger: text,
          start: 'top 95%',
          once: true // This will ensure it only animates once
        }
      });
    });
  }

  animateOpportunities() {
    const gridItems = this.gridContainer.nativeElement.children;
    this. gsap.from(gridItems, {
      autoAlpha: 0, // Hidden initially but still occupies space
      y: 50, // Moves elements up from below
      stagger: 0.2, // Stagger animation for each item
      duration: 1, // Animation duration
      ease: 'power3.out', // Smooth easing
      scrollTrigger: {
        trigger: this.gridContainer.nativeElement,
        start: 'top 80%', // Start animation when the grid container is 80% in view
        toggleActions: 'play none none none' // Play animation once
      }
    });
  }

}


