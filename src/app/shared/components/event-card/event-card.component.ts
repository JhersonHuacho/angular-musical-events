import { Component, inject, Input } from '@angular/core';
import { PruebaService } from '../../../prueba.service';
import { Concert, emptyConcert } from '../../models/concert.model';
import { TextLimiterPipe } from '../../pipes/text-limiter.pipe';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [TextLimiterPipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input({required: true}) data!: Concert;

}
