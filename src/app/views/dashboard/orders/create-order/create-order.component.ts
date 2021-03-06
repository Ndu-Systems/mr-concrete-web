import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CateroryService, AccountService, UserService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Caterory, UserModel, Placeholder, AddressModel } from 'src/app/_models';
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
  order: Order;
  currentUser: UserModel;
  products$: Observable<Product[]>;
  display = false;
  orderProducts: Orderproduct[] = [];

  placeHolder: Placeholder = {
    imageUrl: 'assets/images/dashboard/placeholders/products.svg',
    message: 'No products found in our system.',
    link: '/dashboard/create-product',
    linkLabel: 'Add new product'
  };

  heading = ' Create an order';
  subheading = 'Order List > create order';
  actionButton: any = {
    link: '/dashboard/orders',
    label: 'View Orders'
  };
  selectedProduct: Product;
  cartView: boolean;
  shopHeadingStatus = 'Cart';
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
  CustomerId = 'Guest';
  queryUserModel: { StatusId: string; TypeOfUser: string; };
  customers: UserModel[];
  addressess: AddressModel[];
  AddressId: string;
  constructor(
    private cateroryService: CateroryService,
    private accountService: AccountService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.catergories$ = this.cateroryService.categories;
    this.cateroryService.getCateries();
    this.products$ = this.productService.products;
    this.productService.getProductsByCompanyId(this.currentUser.CompanyId);
    this.productService.products.subscribe(products => {
      if (products) {
        this.allProducts = products;
      }
    });
    this.orderService.orderObservable.subscribe(order => {
      if (order) {
        this.order = order;
        this.total = this.order.Total;
        if (this.order.ShowCart) {
          this.cartView = true;
          this.selectedProduct = this.allProducts[0];
        }
      } else {
        this.orderService.initOrderState();
      }
    });
    this.queryUserModel = {
      StatusId: '1',
      TypeOfUser: 'All'
    };
    this.userService.getAllUsers(this.queryUserModel).subscribe(data => {
      if (data.length > 0) {
        this.customers = data;
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
    if (this.order.Orderproducts === null
      || this.order.Orderproducts === undefined) {
      this.order.Orderproducts = [];
    }
    this.order.Orderproducts.push(orderProduct);
    this.cartView = true;
    this.shopHeadingStatus = 'Added to Cart';

    this.order.Total += Number(product.Price) * Number(this.qty);
    this.orderService.setOrderState(this.order);
    this.qty = 1;

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



  placOrder() {
    if (!this.order.Orderproducts.length) {
      alert('Your cart is empty');
      return false;
    }
    this.order.CustomerId = this.CustomerId || '';
    this.order.SupplierId = this.currentUser.CompanyId || '';
    this.order.ProjectNumber = '';
    this.order.DeliveryDate = this.DeliveryDate;
    this.order.DeliveryTime = this.DeliveryTime || '';
    this.order.DeliveryAddress = this.AddressId || '';
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
  viewOrder() {
    this.orderService.setViewOrderState(this.createdOrder);
    this.router.navigate(['dashboard/view-order']);
  }
  customerChanged(customerId) {
    const customer = this.customers.find(c => c.UserId === customerId);
    if (customer) {
      this.addressess = customer.Address;
    }
  }
}
