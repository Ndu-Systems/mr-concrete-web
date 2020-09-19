import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactUsModel, PillModel, Product } from 'src/app/_models';
import { LocaleIndexService, LocaleProductsService } from 'src/app/_services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  rForm: FormGroup;
  errors: string[] = [];
  SearchText: string;
  pillList: PillModel[] = [];
  productList: Product[] = [];
  List: any[] = [
    {
      Image: 'assets/images/stock/image-1.svg',
      Code: 'image1'
    },
    {
      Image: 'assets/images/stock/image-2.svg',
      Code: 'image2'
    },
    {
      Image: 'assets/images/stock/image-3.svg',
      Code: 'image3'
    }
  ];

  advantages: any[] = [];

  heading = 'Welcome to mr konkrete';

  constructor(
    private fb: FormBuilder,
    private localProductService: LocaleProductsService,
    private localeIndexService: LocaleIndexService
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      Email: [null],
      PhoneNumber: [null, Validators.required],
      Message: [null, Validators.required],
    });

    this.loadPills();
    this.loadProducts();
    this.loadAdvantages();
  }

  onSubmit(model: ContactUsModel) {
    console.log('contact us form', model);
  }
  clearForm() {
    this.rForm.reset();
  }
  onSelected(model: PillModel) {
    // TODO selected pill as a category
  }

  selectedProduct(item) {

  }

  loadPills() {
    this.pillList = [
      {
        Key: 'Domestic',
        Name: 'Domestic'
      },
      {
        Key: 'Commercial',
        Name: 'Commercial'
      }
    ];
  }

  loadProducts() {
    this.localProductService.getProducts().subscribe(data => {
      if (data) {
        this.productList = data;
      }
    });
  }

  loadAdvantages() {
    this.localeIndexService.getAdvantages().subscribe(data => {
      if (data) {
        this.advantages = data;
      }
    });
  }
}

