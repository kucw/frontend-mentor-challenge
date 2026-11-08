import {Component, signal} from '@angular/core';
import {RatingCard} from "../rating-card/rating-card";
import {ThankYouCard} from "../thank-you-card/thank-you-card";

@Component({
  selector: 'app-root',
  imports: [RatingCard, ThankYouCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  isSubmit = signal(false)
  submittedRating = signal(0)

  onRatingSubmit(rating: number) {
    this.isSubmit.set(true)
    this.submittedRating.set(rating)
  }
}
