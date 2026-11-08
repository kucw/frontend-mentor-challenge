import {Component, input} from "@angular/core";

@Component({
  selector: "app-thank-you-card",
  imports: [],
  templateUrl: "./thank-you-card.html",
  styleUrl: "./thank-you-card.scss",
})
export class ThankYouCard {
  rating = input.required<number>();
}
