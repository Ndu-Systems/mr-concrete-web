import { environment } from 'src/environments/environment';
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
  email = environment.EMAIL;
  password = environment.PASSWORD;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private routeTo: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      Email: new FormControl(
        this.email,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      Password: [this.password, Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'dashboard';
  }

  onSubmit(model: SignInModel) {
    this.accountService.signIn(model)
      .pipe(first())
      .subscribe(data => {
        if (data.Email) {
          this.routeTo.navigate([this.returnUrl]);
        }
      }, error => {
        this.error = error;
      });
  }


}
