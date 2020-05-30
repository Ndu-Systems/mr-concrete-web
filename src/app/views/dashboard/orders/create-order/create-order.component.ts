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
  rForm: FormGroup;
  products$: Observable<Product[]>;


  heading = ' Create an order';
  subheading = 'Order List >> create order';
  actionButton: any = {
    link: '/dashboard/orders',
    label: 'View Orders'
  };
  constructor(
    private cateroryService: CateroryService,
    private accountService: AccountService,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder

  ) {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      CustomerId: [null],
      ProjectNumber: [null],
      DeliveryDate: [null],
      DeliveryTime: [null],
      DeliveryAddress: [null],
      SpecialInstructions: [null],
      Total: [0],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      StatusId: [1, Validators.required]
    });
  }

  ngOnInit() {
    this.catergories$ = this.cateroryService.categories;
    this.cateroryService.getCateries();
    this.products$ = this.productService.products;

  }



  selectCatergory(caterory: Caterory) {
    this.order.CategoryId = caterory.CategoryId;
    this.order.category = caterory;
    console.log(this.order);
  }
  addToCart(product: Product) {
    const orderProduct: Orderproduct = {
      OrderProductId: '',
      OrderId: '',
      ProductId: product.ProductId,
      ProductName: product.ProductName,
      Price: product.ProductId,
      Quantity: product.Quantity,
      Units: product.Units,
      CrateUserId: this.currentUser.UserId,
      ModifyUserId: this.currentUser.UserId,
      StatusId: 1
    };
  }

  ngOnDestroy(): void {
  }
  onSubmit(form) {

  }
  add() {}
}
