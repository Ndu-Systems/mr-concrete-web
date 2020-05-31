import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CateroryService, AccountService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Caterory, UserModel } from 'src/app/_models';
import { OrderView, initOrderView } from 'src/app/_models/orderview.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/dashboard/product.service';
import { Orderproduct } from 'src/app/_models/orderproduct .model';
import { Order } from 'src/app/_models/order.model';
import { OrderService } from 'src/app/_services/dashboard/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  @Output() orderToCreateEmitter: EventEmitter<OrderView> = new EventEmitter<OrderView>();
  catergories$: Observable<Caterory[]>;
  order: OrderView = initOrderView;
  currentUser: UserModel;
  products$: Observable<Product[]>;
  display = false;
  orderProducts: Orderproduct[] = [];


  heading = ' Create an order';
  subheading = 'Order List >> create order';
  actionButton: any = {
    link: '/dashboard/orders',
    label: 'View Orders'
  };
  selectedProduct: Product;
  cartView: boolean;
  shopHeadingStatus: string;
  qty = 1;
  total = 0;
  showCheckout: boolean;
  DeliveryDate: any;
  DeliveryTime: any;
  DeliveryAddress: any;
  loading: boolean;
  orderCreated: boolean;
  constructor(
    private cateroryService: CateroryService,
    private accountService: AccountService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.catergories$ = this.cateroryService.categories;
    this.cateroryService.getCateries();
    this.products$ = this.productService.products;
    this.productService.products.subscribe(p => {
      // this.selectedProduct = p[0];
    });

  }



  selectCatergory(caterory: Caterory) {
    this.order.CategoryId = caterory.CategoryId;
    this.order.category = caterory;
    console.log(this.order);
  }
  addToCart(product: Product) {
    this.selectedProduct = product;
    this.cartView = false;
  }
  confirmItemToCart(product: Product) {
    const orderProduct: Orderproduct = {
      OrderProductId: '',
      OrderId: '',
      ProductId: product.ProductId,
      ProductName: product.ProductName,
      Price: product.Price,
      Quantity: this.qty,
      Units: product.Units,
      CrateUserId: this.currentUser.UserId,
      ModifyUserId: this.currentUser.UserId,
      StatusId: 1,
      Images: product.Images
    };
    this.orderProducts.push(orderProduct);
    console.log(' this.orderProducts', this.orderProducts);
    this.cartView = true;
    this.shopHeadingStatus = 'Added to Cart';
    this.total += Number(product.Price) * this.qty;
    this.qty = 1;

  }

  continueOrdering() {
    this.cartView = true;
    this.selectedProduct = null;
  }
  checkout() {
    this.showCheckout = true;
    this.shopHeadingStatus = 'Check Out';
  }


  placOrder() {
    if (!this.orderProducts.length) {
      alert('Your cart is empty');
      return false;
    }

    const order: Order = {
      CustomerId: this.currentUser.UserId,
      SupplierId: this.currentUser.UserId,
      ProjectNumber: 'na',
      DeliveryDate: this.DeliveryDate,
      DeliveryTime: this.DeliveryTime,
      DeliveryAddress: this.DeliveryAddress,
      SpecialInstructions: '',
      Total: this.total,
      CrateUserId: this.currentUser.UserId,
      ModifyUserId: this.currentUser.UserId,
      StatusId: 1,
      Orderproducts: this.orderProducts
    };
    this.loading = true;
    this.orderService.addOrder(order).subscribe(data => {
      this.loading = false;
      this.orderCreated = true;
      this.selectedProduct = null;
    });
  }

  ngOnDestroy(): void {
  }

  addQty(qty) {
    if (qty < 0 && this.qty < 1) {
      return false;
    }
    this.qty += qty;
  }
  onSubmit(form) {

  }
  add() { }
  list() {
    this.router.navigate(['/dashboard/orders']);
  }
  viewOrder() { this.router.navigate(['/dashboard/orders']); }
}
