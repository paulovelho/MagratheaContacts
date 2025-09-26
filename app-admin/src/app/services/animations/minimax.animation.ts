import { trigger, state, style, animate, transition, group } from '@angular/animations';

export const minimax = trigger('minimax', [
	transition(':enter', [
		style({ height: 0 }),
		animate('400ms', style({ height: '*' }))
	]),
	transition(':leave', [
		animate('400ms', style({ height: 0 }))
	])
]);
