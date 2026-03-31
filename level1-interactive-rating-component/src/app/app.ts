import {Component, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  selectedBtn = signal<number | null>(null);
  isSubmit = signal(false);

  onRatingBtnClick(id: number) {
    this.selectedBtn.set(id);
  }

  isSelected(id: number): boolean {
    return this.selectedBtn() === id
  }

  // 當 submit button 被點擊時，就改 isSubmit 的狀態
  // 讓 HTML 自己去根據當前狀態決定要 show rating card 還是 thank you card
  onSubmitBtnClick() {
    this.isSubmit.set(true);
  }
}
