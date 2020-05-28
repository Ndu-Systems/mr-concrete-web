import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Product } from 'src/app/_models/product.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/dashboard/product.service';
import { AccountService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  heading = 'Create Product';
  subheading = '';
  actionButton: any = {
    link: '/dashboard/products',
    label: 'View Products'
  };
  rForm: FormGroup;
  currentUser: UserModel;

  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private productService: ProductService,
    private accountService: AccountService,


  ) {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      ProductId: [null],
      UserId: [this.currentUser.UserId, Validators.required],
      ProductName: [null, Validators.required],
      ShortDescription: [''],
      Description: [''],
      ProductCode: [''],
      Price: [null, Validators.required],
      Quantity: [null, Validators.required],
      Units: [''],
      CategoryId: [''],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      StatusId: [1, Validators.required],
      Properties: [null]
    });
  }

  ngOnInit() {

  }

  onSubmit(product: Product) {
    this.productService.addProduct(product).subscribe(response => {
      // this.messageService.add({
      //   severity: 'success',
      //   summary: 'Success!',
      //   detail: 'product created '
      // });
      console.log(response);
      this.routeTo.navigate([`/dashboard/products`]);
    });

  }

}
