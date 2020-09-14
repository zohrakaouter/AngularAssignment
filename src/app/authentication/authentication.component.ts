import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  returnUrl: string;
  decodedToken: { [key: string]: string };

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,   private formBuilder: FormBuilder,
    private route: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
    
      'username': new FormControl(null),
      'password': new FormControl(null),
     
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/login';
      
    }
  }
  get f() { return this.loginForm.controls; }
  onSubmit(): void {
    console.log("on submitt");
    if (this.loginForm.invalid) {
      console.log("form invalid");
      return;
  }

    this.authService.login(this.f.username.value, this.f.password.value)
    .subscribe(
     
      data  => {
        
        this.tokenStorage.saveToken( (JSON.stringify(data.body['data']['session_token'])).replace(new RegExp('"', "g"), ''));
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        
        this.router.navigate(['list-calculations']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}