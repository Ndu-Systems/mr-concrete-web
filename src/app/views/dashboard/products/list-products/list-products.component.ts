import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/dashboard/product.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Product } from 'src/app/_models/product.model';
import { UserModel, Placeholder } from 'src/app/_models';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  heading = 'Products';
  subheading = '';
  actionButton: any = {
    link: '/dashboard/create-product',
    label: 'Create Product'
  };

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/products.svg',
    message: 'No products found in our system.',
    link: '/dashboard/create-product',
    linkLabel: 'Add new product'
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
    this.productService.getProductsByCompanyId(this.user.CompanyId);


  }

  more(product: Product) {
    this.productService.updateProductState(product);
    this.router.navigate(['/dashboard/edit-product']);
  }
  add() {}
}
