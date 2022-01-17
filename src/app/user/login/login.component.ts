import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnyRecord } from 'dns';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userState: string;
  alert: boolean = false
  error_1 : any 
  error_2 : any


  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',
      [Validators.required,
      Validators.minLength(4)])
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  closeAlert() {
    this.alert = false;
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        this.toastr.success("", "Welcome to my Dashboard");
         this.router.navigateByUrl('/dashboard');       
      },
      (err: any) => {
        console.log("Error in login");
        switch(err.status) {
          case 400 : { 
            this.alert = true;
            this.error_1 = 'Authentication Failed !';
            this.error_2 = 'Invalid Email or Password';
            break;
          }
          case 401 : {
            this.alert = true;
            this.error_1 = 'Authentication Failed !';
            this.error_2 = 'Invalid Email or Password.';
            break;
          }
          case 0 : {
           this.alert = true;
           this.error_1 = 'Server Error !';
           this.error_2 = 'Communication Error';
           this.toastr.error('Communication Error', 'Server Error.');
           break;
         }
         default :
         {
          this.error_1 = 'Server Error !';
          this.error_2 = 'Communication Error.';
           break;
         }
        }
      /*  console.log("400=",err);
        if (err.status == 400) {
          localStorage.removeItem('token');
          this.alert = true;
          this.toastr.error('Invalid Email or Password', 'Authentication Failed');
        }
        else if (err.status == 401) {
          localStorage.removeItem('token');
          console.log("401=",err);
          this.alert = true;
          this.toastr.error('Invalid Email or Password', 'Authentication Failed');
        }
        else if (err.status == 0) {
          localStorage.removeItem('token');
          console.log("0=",err);
          this.alert = true;
          this.toastr.error('Communication Error', 'Server Error');
        }
        else {
          localStorage.removeItem('token');
          console.log(err);
          this.toastr.error('Communication Error', 'Server Error');
        }*/
      },
    );

  }


}

