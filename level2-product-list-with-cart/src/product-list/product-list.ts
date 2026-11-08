import {Component, input, model} from "@angular/core";
import {Product} from "../models/product";
import {DecimalPipe} from "@angular/common";

@Component({
  imports: [DecimalPipe],
  selector: "app-product-list",
  styleUrl: "./product-list.scss",
  templateUrl: "./product-list.html",
})
export class ProductListComponent {
  products = input.required<Product[]>();
  // 記錄購物車中的 product id -> 數量，用 model 雙向綁定回 AppComponent
  cart = model.required<Map<number, number>>();

  // 當某個 product 被加入購物車
  onAddToCartClick(id: number) {
    this.cart.update(cart => {
      const newCart = new Map(cart);
      newCart.set(id, 1);
      return newCart;
    });
  }

  // 檢查某個 product 是否已在購物車
  isInCart(id: number) {
    return this.cart().has(id);
  }

  // 取得某個 product 在購物車中的數量
  getQuantity(id: number) {
    return this.cart().get(id) ?? 0;
  }

  // +1 product 數量
  onIncrementQuantity(id: number) {
    this.cart.update(cart => {
      let newCart = new Map(cart);
      newCart.set(id, (cart.get(id) ?? 0) + 1);
      return newCart;
    });
  }

  // -1 product 數量
  onDecrementQuantity(id: number) {
    this.cart.update(cart => {
      let newCart = new Map(cart);
      let quantity = (cart.get(id) ?? 0) - 1;

      // 如果減完到 0 了，那就從 cart 中 remove
      if (quantity <= 0) {
        newCart.delete(id);
      } else {
        newCart.set(id, quantity);
      }

      return newCart;
    });
  }
}
