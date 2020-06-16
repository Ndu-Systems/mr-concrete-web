import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UserModel, Image } from 'src/app/_models';
import { Property } from 'src/app/_models/property.model';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/dashboard/product.service';
import { AccountService, CateroryService } from 'src/app/_services';
import { UploadService } from 'src/app/_services/dashboard/upload.service';
import { Product } from 'src/app/_models/product.model';
// import { MessageService } from 'primeng/api/primeng-api';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  heading = 'Edit Product';
  subheading = '';
  actionButton: any = {
    link: '/dashboard/products',
    label: 'View Products'
  };
  rForm: FormGroup;
  currentUser: UserModel;
  propertiesArray: Property[] = [];
  images: Image[] = [];
  catergories$: any;
  product: Product;

  constructor(
    private fb: FormBuilder,
    private routeTo: Router,
    private productService: ProductService,
    private accountService: AccountService,
    private uploadService: UploadService,
    private categoryService: CateroryService,
    // private messageService: MessageService,
  ) {

  }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.uploadService.images.subscribe(images => {
      this.images = images || [];
    });
    this.catergories$ = this.categoryService.categories;
    this.categoryService.getCateries();

    this.productService.product.subscribe(product => {
      this.product = product;
      if (this.product) {
        this.rForm = this.fb.group({
          ProductId: [this.product.ProductId],
          CompanyId: [this.currentUser.CompanyId, Validators.required],
          ProductName: [this.product.ProductName, Validators.required],
          ShortDescription: [this.product.ShortDescription],
          Description: [this.product.Description],
          ProductCode: [this.product.ProductCode],
          Price: [this.product.Price, Validators.required],
          Quantity: [this.product.Quantity, Validators.required],
          Units: [this.product.Units],
          CategoryId: [this.product.CategoryId],
          CreateUserId: [this.currentUser.UserId, Validators.required],
          ModifyUserId: [this.currentUser.UserId, Validators.required],
          StatusId: [this.product.StatusId, Validators.required],
          Image: new FormControl(null),
          Properties: this.fb.array([])
        });
        if (this.product.Properties) {
          this.product.Properties.forEach(property => {
            this.addPropertyRow(property);
          });
        }
      }
    });
  }

  get formValues() {
    return this.rForm.controls;
  }

  get formProperties() {
    return this.rForm.get('Properties') as FormArray;
  }
  addPropertyRow(item: Property) {
    const property = this.fb.group(
      {
        ProductpropertyId: item.ProductpropertyId,
        Name: item.Name,
        ProductId: item.ProductId,
        Code: item.Code,
        Value: item.Value,
        Units: item.Units,
        StatusId: item.StatusId,
        ModifyUserId: item.ModifyUserId,
        CrateUserId: item.CrateUserId,
      }
    );
    this.formProperties.push(property);
  }
  addNewPropertyRow() {
    const property = this.fb.group(
      {
        ProductpropertyId: 'new',
        Name: '',
        ProductId: '',
        Code: '',
        Value: '',
        Units: '',
        StatusId: '',
        ModifyUserId: '',
        CrateUserId: '',
      }
    );
    this.formProperties.push(property);
  }
  deleteId(i, f: FormGroup) {
    console.log(f);
    console.log(f.value);
    if (f.value.ProductpropertyId !== 'new') {
      console.log(this.formProperties.value);
      f.value.StatusId = 3;
      this.productService.updateProperty(f.value);
    }
    this.formProperties.removeAt(i);
  }

  onSubmit(product: Product) {
    product.Images = this.images;
    this.productService.updateProduct(product).subscribe(response => {
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
