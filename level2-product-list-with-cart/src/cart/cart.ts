import {Component, computed, input, model} from "@angular/core";
import {CartItem} from "../models/cart-item";
import {DecimalPipe} from "@angular/common";
import {Product} from "../models/product";

@Component({
  imports: [DecimalPipe],
  selector: "app-cart",
  styleUrl: "./cart.scss",
  templateUrl: "./cart.html",
})
export class CartComponent {
  products = input.required<Product[]>();
  // 記錄購物車中的 product id -> 數量，用 model 雙向綁定回 AppComponent
  cart = model.required<Map<number, number>>();

  // 根據 cart 中的數據，實時算出 cartItems
  cartItems = computed<CartItem[]>(() => {
    const productMap = new Map(this.products().map(p => [p.id, p]));
    const items: CartItem[] = [];

    // 從當前 cart 中取得 productId 與 quantity
    for (const [productId, quantity] of this.cart()) {
      const product = productMap.get(productId);

      // 封裝成 cartItem
      if (product !== undefined) {
        items.push({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: quantity,
          totalPrice: product.price * quantity
        });
      }
    }

    // 最後根據 productId sort 一下
    items.sort((a, b) => a.productId - b.productId);

    return items;
  });

  // 計算全部的總金額
  totalAmount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.totalPrice, 0)
  );

  // 檢查當前 cart 是否為 empty
  isCartEmpty = computed(() => this.cart().size === 0);

  // 刪除某個 cart item
  removeCartItem(productId: number) {
    let newCart = new Map(this.cart());
    newCart.delete(productId);

    // 重點！把新 map set 回 signal，signal 才會認定這有更新，畫面才會重新計算，坑啊....
    this.cart.set(newCart);
  }
}
