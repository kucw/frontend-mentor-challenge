import {Component, inject} from "@angular/core";
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
}
