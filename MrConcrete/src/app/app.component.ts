import { Component, OnInit } from '@angular/core';
import { Item } from './_models';
import { ApiService, PwaService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '-Mr Concrete';
  items: Item[];

  constructor(
    private apiService: ApiService,
    public pwaService: PwaService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.apiService.get().subscribe(data => {
      console.log(data);
      this.items = data;
    }, (error) => {
      console.log(error);
    });
  }
}
