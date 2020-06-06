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
import { ORDER_STATUS } from 'src/app/_shared';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit, OnDestroy {

  @Output() orderToCreateEmitter: EventEmitter<OrderView> = new EventEmitter<OrderView>();
  catergories$: Observable<Caterory[]>;
  order: Order;
  currentUser: UserModel;
  products$: Observable<Product[]>;
  display = false;
  orderProducts: Orderproduct[] = [];


  heading = ' Create an order';
  subheading = 'Order List > create order';
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
  createdOrder: Order;
  SpecialInstructions: string;
  allProducts: Product[];
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
    this.productService.products.subscribe(products => {
      if (products) {
        this.allProducts = products;
      }
    })
    this.orderService.orderObservable.subscribe(order => {
      if (order) {
        this.order = order;
        if (this.order.ShowCart) {
          this.cartView = true;
          this.selectedProduct = this.allProducts[0];
        }
      } else {
        this.orderService.initOrderState();
      }
    });


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
    this.order.Orderproducts.push(orderProduct);
    this.cartView = true;
    this.shopHeadingStatus = 'Added to Cart';
    this.total += Number(product.Price) * this.qty;
    this.qty = 1;

    this.order.Total += this.total;
    this.orderService.setOrderState(this.order);

  }

  continueOrdering() {
    this.cartView = true;
    this.selectedProduct = null;
    this.order.ShowCart = false;
    this.orderService.setOrderState(this.order);
  }
  checkout() {
    this.showCheckout = true;
    this.shopHeadingStatus = 'Check Out';
  }

  removeItem(item: Orderproduct, index: number) {
    console.log(item);
    this.order.Total -= (item.Quantity * item.Price);
    this.order.Orderproducts.splice(index, 1);
    this.orderService.setOrderState(this.order);
  }


  placOrder() {
    if (!this.order.Orderproducts.length) {
      alert('Your cart is empty');
      return false;
    }
    this.order.CustomerId = '';
    this.order.SupplierId = this.currentUser.UserId;
    this.order.ProjectNumber = '';
    this.order.DeliveryDate = this.DeliveryDate || '';
    this.order.DeliveryTime = this.DeliveryTime || '';
    this.order.DeliveryAddress = this.DeliveryAddress || '';
    this.order.SpecialInstructions = this.SpecialInstructions || '';
    this.order.CrateUserId = this.currentUser.UserId;

    this.loading = true;
    this.orderService.addOrder(this.order).subscribe(data => {
      this.loading = false;
      this.orderCreated = true;
      this.selectedProduct = null;
      this.createdOrder = data;
      this.orderService.initOrderState();
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

  add() { }
  list() {
    this.router.navigate(['/dashboard/orders']);
  }
  viewOrder() { this.router.navigate(['/dashboard/orders']); }
}
