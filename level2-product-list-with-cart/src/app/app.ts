import {Component} from '@angular/core';
import {ProductListComponent} from "../product-list/product-list";
import {CartComponent} from "../cart/cart";

@Component({
  imports: [ProductListComponent, CartComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class AppComponent {
}
