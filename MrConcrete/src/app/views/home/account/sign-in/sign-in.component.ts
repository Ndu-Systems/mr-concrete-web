import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignInModel } from 'src/app/_models';
import { AccountService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  rForm: FormGroup;
  hidePassword = true;
  error: string;
  returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private routeTo: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      Email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Password: [null, Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard';
  }

  onSubmit(model: SignInModel) {
    this.accountService.signIn(model)
      .pipe(first())
      .subscribe(data => {
        if (data) {
          this.routeTo.navigate([this.returnUrl]);
        }
      }, error => {
        this.error = error;
      });
  }


}
