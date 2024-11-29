import { trigger, transition, style, animate } from '@angular/animations';

export const pokemonDetailsAnimations = [
  trigger('fadeSlide', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(-20px)' }),
      animate(
        '400ms ease-out',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
    ]),
  ]),
];
