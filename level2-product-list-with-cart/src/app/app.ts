import {Component, inject, signal} from '@angular/core';
import {ProductListComponent} from "../product-list/product-list";
import {CartComponent} from "../cart/cart";
import {CartService} from "../services/cart.service";

@Component({
  imports: [ProductListComponent, CartComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class AppComponent {
  cartService = inject(CartService);

  // 決定是否要 show order dialog
  showOrderDialog = signal(false);

  // 聽 CartComponent 發送的 event，聽到就 set show dialog to true
  onOrderComplete() {
    this.showOrderDialog.set(true);
  }

  // 全部清空重來
  onStartNewOrder() {
    this.showOrderDialog.set(false);
    this.cartService.reset();
  }
}
