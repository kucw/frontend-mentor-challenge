import {Component, inject} from "@angular/core";
import {DecimalPipe} from "@angular/common";
import {ProductService} from "../services/product.service";
import {CartService} from "../services/cart.service";

@Component({
  imports: [DecimalPipe],
  selector: "app-product-list",
  styleUrl: "./product-list.scss",
  templateUrl: "./product-list.html",
})
export class ProductListComponent {
  productService = inject(ProductService);
  cartService = inject(CartService);
}
