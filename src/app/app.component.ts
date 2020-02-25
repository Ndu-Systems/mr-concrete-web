import { Component, OnInit } from '@angular/core';
import { Item } from './_models';
import { ApiService, PwaService } from './_services';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '-Mr Concrete';
  items: Item[];

  constructor(
    public pwaService: PwaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.scrollUp();
  }
  installPwa(): void {
    this.pwaService.promptEvent.prompt();
  }

  scrollUp() {
    this.router.events.subscribe((ev) => {
      if (!(ev instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
