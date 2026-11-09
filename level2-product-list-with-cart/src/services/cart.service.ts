import {inject, Service, signal} from "@angular/core";
import {ProductService} from "./product.service";
import {CartItem} from "../models/cart-item";

// 管理購物車狀態
@Service()
export class CartService {
  productService = inject(ProductService);

  // 記錄購物車中的 product id -> cartItem
  cart = signal<Map<number, CartItem>>(new Map());

  // 實時加總購物車全部商品的總金額和個數
  cartTotalQuantity = signal(0);
  cartTotalPrice = signal(0);

  // 檢查某個 product 是否已在購物車
  isInCart(id: number) {
    return this.cart().has(id);
  }

  // 取得某個 product 在購物車中的數量
  getQuantity(id: number) {
    return this.cart().get(id)?.quantity ?? 0;
  }

  // 取得購物車中的所有商品，要按照 id 排序
  getCartItems(): CartItem[] {
    return [...this.cart().values()]
      .sort((a, b) => a.id - b.id);
  }

  // +1 該 product 在購物車中的數量
  onIncrementProduct(id: number) {
    this.cart.update(cart => {
      let newCart = new Map(cart);
      let cartItem = newCart.get(id);

      // 如果 cartItem 不存在，就新增一個，存在就 quantity +1
      if (cartItem === undefined) {
        const product = this.productService.getProduct(id);
        cartItem = {
          id: id,
          name: product?.name ?? '',
          price: product?.price ?? 0,
          quantity: 1,
        }
        newCart.set(id, cartItem);
      } else {
        cartItem.quantity += 1;
      }

      this.cartTotalQuantity.update((quantity) => quantity + 1);
      this.cartTotalPrice.update((totalPrice) => totalPrice + cartItem.price);

      return newCart;
    });
  }

  // -1 該 product 在購物車中的數量
  onDecrementProduct(id: number) {
    this.cart.update(cart => {
      let newCart = new Map(cart);
      let cartItem = newCart.get(id);
      if (cartItem !== undefined) {
        cartItem.quantity -= 1;

        this.cartTotalQuantity.update((quantity) => quantity - 1);
        this.cartTotalPrice.update((totalPrice) => totalPrice - cartItem.price);

        // 如果減完到 0 了，那就從 cart 中 remove
        if (cartItem.quantity <= 0) {
          newCart.delete(id);
        }
      }
      return newCart;
    });
  }

  // 直接刪除該 product，不論他有幾個 quantity
  onRemoveProduct(id: number) {
    this.cart.update(cart => {
      let newCart = new Map(cart);
      let cartItem = newCart.get(id);
      if (cartItem !== undefined) {
        this.cartTotalQuantity.update((quantity) => quantity - cartItem.quantity);
        this.cartTotalPrice.update((totalPrice) => totalPrice - cartItem.quantity * cartItem.price);
        newCart.delete(id);
      }
      return newCart;
    });
  }

  // 全部狀態清空重來
  reset() {
    this.cartTotalQuantity.set(0);
    this.cartTotalPrice.set(0);
    this.cart.set(new Map());
  }
}
