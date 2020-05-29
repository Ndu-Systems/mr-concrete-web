import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Product } from 'src/app/_models/product.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/dashboard/product.service';
import { AccountService, CateroryService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';
import { Property } from 'src/app/_models/property.model';
import { UploadService } from 'src/app/_services/dashboard/upload.service';

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
  propertiesArray: Property[] = [];
  images: string[] = [];
  catergories$: any;

  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private productService: ProductService,
    private accountService: AccountService,
    private uploadService: UploadService,
    private categoryService: CateroryService,
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
      Image: new FormControl(null),
      Properties: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addPropertyRow('1');
    this.addPropertyRow('2');
    this.uploadService.imagesUrlsToUpload.subscribe(images => {
      this.images = images || [];
    });
    this.catergories$ = this.categoryService.categories;
    this.categoryService.getCateries();
  }

  get formValues() {
    return this.rForm.controls;
  }

  get formProperties() {
    return this.rForm.get('Properties') as FormArray;
  }
  addPropertyRow(id = '') {
    const property = this.fb.group(
      {
        Name: '',
        Code: '',
        Value: '',
        Units: ''
      }
    );
    this.formProperties.push(property);
  }
  deleteId(i) {
    this.formProperties.removeAt(i);
  }

  onSubmit(product: Product) {
    product.Images = this.images;
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
