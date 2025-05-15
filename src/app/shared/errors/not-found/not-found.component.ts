import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements AfterViewInit {
  isBrowser = false;
  intervalId: any;
  stars: {
    top: string;
    left: string;
    size: string;
    duration: string;
    animationDelay: string;
    moveX: string;
    moveY: string;
  }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.generateStars(100); // any number of stars
        this.createMeteors();
      }, 0);
    }
  }

  generateStars(count: number) {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 2 + 1}px`,
        duration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 3}s`,
        moveX: `${(Math.random() - 0.5) * 10}px`,
        moveY: `${(Math.random() - 0.5) * 10}px`
      });
    }
  }

  createMeteors(): void {
    this.intervalId = setInterval(() => {
      const meteorCount = 3; // number of meteors per interval
      for (let i = 0; i < meteorCount; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';

        // Randomize vertical position and delay appearance a bit
        meteor.style.top = `${Math.random() * 100}vh`;
        meteor.style.left = `${70 + Math.random() * 20}vw`; // Starts between 150vw-200vw (far off-screen)

        // Optional: add a small delay so meteors don't appear exactly at the same time
        setTimeout(() => {
          document.body.appendChild(meteor);

          setTimeout(() => {
            meteor.remove();
          }, 4000); // match animation duration here
        }, i * 400); // stagger start times by 500ms
      }
    }, 4000); // interval equal to animation duration to avoid overlaps
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      const hue = Math.floor(Math.random() * 360);

      // Smooth background color change
      document.body.style.transition = 'background-color 1s ease';
      document.body.style.backgroundColor = `hsl(${hue}, 70%, 20%)`;

      // Create starburst element
      const starburst = document.createElement('div');
      starburst.className = 'starburst-effect';
      document.body.appendChild(starburst);

      // Create flash text element
      const flashText = document.createElement('div');
      flashText.innerHTML = `✨ Go Back and Discover Your Dream College with<br><span style="display:inline-block; color: #df00ff; font-size: 2.5rem; margin-top: 0.5rem;">StudyInBengaluru! 🎓</span>`;
      flashText.style.position = 'fixed';
      flashText.style.top = '20%';
      flashText.style.left = '50%';
      flashText.style.transform = 'translateX(-50%)';
      flashText.style.color = 'white';
      flashText.style.fontSize = '2rem';
      flashText.style.fontWeight = 'bold';
      flashText.style.textAlign = 'center';
      flashText.style.textShadow = '0 0 8px white';
      flashText.style.zIndex = '10001';
      document.body.appendChild(flashText);


      // Cleanup after animation
      setTimeout(() => {
        document.body.style.backgroundColor = '';
        starburst.remove();
        flashText.remove();
      }, 1500);
    }
  }
}

