import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

export const slideInFromLeft = trigger('slideInFromLeft', [
  state('out', style({ opacity: 0, transform: 'translateX(-100%)' })),
  state('in', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('out => in', animate('0.8s ease-out')),
]);


export const slideInFromRight = trigger('slideInFromRight', [
  state('out', style({ opacity: 0, transform: 'translateX(100%)' })),
  state('in', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('out => in', animate('0.8s ease-out')),

]);


export const staggerFadeIn = trigger('staggerFadeIn', [
  state('out', style({ opacity: 0 })),
  state('in', style({ opacity: 1 })),
  transition('out => in', [
    query('.stagger-item', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger('200ms', [
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

export const zoomIn = trigger('zoomIn', [
  state('out', style({ opacity: 0, transform: 'scale(0.8)' })),
  state('in', style({ opacity: 1, transform: 'scale(1)' })),
  transition('out => in', animate('0.8s ease-out')),
]);

export const fadeIn = trigger('fadeIn', [
  state('hidden', style({ opacity: 0 })),
  state('visible', style({ opacity: 1 })),
  transition('hidden => visible', animate('0.8s ease-out')),
]);

export const slideUp = trigger('slideUp', [
  state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
  state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('hidden => visible', animate('0.8s ease-out')),
]);
export const listAnimation = trigger('listAnimation', [
  state('hidden', style({ opacity: 0, transform: 'translateY(-30px)' })), // Initial state
  state('visible', style({ opacity: 1, transform: 'translateY(0)' })), // Final state
  transition('hidden => visible', [
    query('.grid-item', [
      stagger('200ms', [ // Stagger delay between each item
        animate('0.8s cubic-bezier(0.25, 1, 0.5, 1)') // Animate opacity and translateY
      ])
    ], { optional: true })
  ])
]);

export const fadeInSequential = trigger('fadeInSequential', [
  state('in', style({ opacity: 1, transform: 'translateY(0)' })),
  state('out', style({ opacity: 0, transform: 'translateY(20px)' })),
  transition('out => in', animate('0.5s ease-out')),
])




// FadeInUp with proper states
export const fadeInUp = trigger('fadeInUp', [
  state('in', style({ opacity: 1, transform: 'translateY(0)' })),
  state('out', style({ opacity: 0, transform: 'translateY(50px)' })),
  transition('out => in', animate('800ms ease-out')),
  transition('in => out', animate('500ms ease-in')),
  // Keep the original :enter transition for compatibility
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(50px)' }),
    animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

// ScaleUp with proper states
export const scaleUp = trigger('scaleUp', [
  state('in', style({ opacity: 1, transform: 'scale(1)' })),
  state('out', style({ opacity: 0, transform: 'scale(0.9)' })),
  transition('out => in', animate('600ms ease-out')),
  transition('in => out', animate('400ms ease-in')),
  // Keep the original :enter transition for compatibility
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

