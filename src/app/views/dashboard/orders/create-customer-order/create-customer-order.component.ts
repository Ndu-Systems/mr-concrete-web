import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Caterory, UserModel, AddressModel, Placeholder, CompanyModel } from 'src/app/_models';
import { Order } from 'src/app/_models/order.model';
import { Product } from 'src/app/_models/product.model';
import { Orderproduct } from 'src/app/_models/orderproduct .model';
import { CateroryService, AccountService, UserService, CompanyService } from 'src/app/_services';
import { ProductService } from 'src/app/_services/dashboard/product.service';
import { OrderService } from 'src/app/_services/dashboard/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-customer-order',
  templateUrl: './create-customer-order.component.html',
  styleUrls: ['./create-customer-order.component.scss']
})
export class CreateCustomerOrderComponent implements OnInit {


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
  supplier: CompanyModel;
  companyId: string;
  constructor(
    private cateroryService: CateroryService,
    private accountService: AccountService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private userService: UserService,
    private companyService: CompanyService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.addressess = this.currentUser.Address;
    this.catergories$ = this.cateroryService.categories;
    this.cateroryService.getCateries();
    this.products$ = this.productService.products;
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

    this.companyService.detailedCompanyObservable.subscribe(company => {
      if (company && company.CompanyId) {
        this.companyId = company.CompanyId;
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
    this.order.CustomerId = this.currentUser.UserId || '';
    this.order.SupplierId = this.companyId;
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
