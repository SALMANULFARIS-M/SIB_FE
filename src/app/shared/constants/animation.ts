import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1s ease-in', style({ opacity: 1 }))
  ])
]);

export const slideInFromLeft = trigger('slideInFromLeft', [
  transition('out => in', [  // <-- Define state transition
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('0.8s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
]);


export const slideInFromRight = trigger('slideInFromRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('0.8s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);
export const staggerFadeIn = trigger('staggerFadeIn', [
  transition(':enter', [
    query('p', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger('0.2s', [
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ])
]);

export const zoomIn = trigger('zoomIn', [
  transition(':enter', [
    style({ transform: 'scale(0.8)', opacity: 0 }),
    animate('0.8s ease-out', style({ transform: 'scale(1)', opacity: 1 }))
  ])
]);
