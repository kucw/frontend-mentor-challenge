import {Component, inject, output} from "@angular/core";
import {DecimalPipe} from "@angular/common";
import {CartService} from "../services/cart.service";

@Component({
  imports: [DecimalPipe],
  selector: "app-cart",
  styleUrl: "./cart.scss",
  templateUrl: "./cart.html",
})
export class CartComponent {
  cartService = inject(CartService);

  // 用 output 發送一個 event，表示使用者點了 order complete 按鈕
  orderComplete = output<void>();

  onOrderComplete() {
    this.orderComplete.emit();
  }
}
