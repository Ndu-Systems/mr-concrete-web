import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/dashboard/product.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services';
import { Observable } from 'MrConcrete/node_modules/rxjs';
import { Product } from 'src/app/_models/product.model';
import { UserModel } from 'src/app/_models';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  heading = 'Porducts';
  subheading = '';
  actionButton: any = {
    link: '/dashboard/create-product',
    label: 'Create Product'
  };
  products$: Observable<Product[]>;
  user: UserModel;

  constructor(
    private productService: ProductService,
    private router: Router,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
    this.products$ = this.productService.products;
    this.productService.getProductsByUserId(this.user.UserId);


  }

  more(product: Product) {
    this.productService.updateProductState(product);
    this.router.navigate(['/dashboard/edit-product']);
  }

}
