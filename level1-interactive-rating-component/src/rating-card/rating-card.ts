import {Component, output, signal} from "@angular/core";

@Component({
  selector: "app-rating-card",
  imports: [],
  templateUrl: "./rating-card.html",
  styleUrl: "./rating-card.scss",
})
export class RatingCard {
  selectedRating = signal(0);

  // 宣告要傳給 Parent 的事件
  ratingSubmit = output<number>();

  onRatingBtnClick(id: number) {
    this.selectedRating.set(id);
  }

  // 按下 Submit 按鈕之後，發出一個事件，將選取的 rating 值 (number 類型) 傳給 Parent
  onSubmitBtnClick() {
    this.ratingSubmit.emit(this.selectedRating());
  }
}
