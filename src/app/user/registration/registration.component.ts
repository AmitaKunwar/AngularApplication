import { Router } from '@angular/router';
import { registerUser } from './../../shared/registerUser.model';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, FormGroupDirective } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { matchValidator } from 'src/app/shared/form-validators';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  passmsg: string;
  clicked = false;
  submitted = false;
  regUser: registerUser = new registerUser();
  alert : boolean = false;
  /* Reactive Form*/
  constructor(public uService: UserService, public elementRef: ElementRef, private toastr: ToastrService, private fb: FormBuilder,private router : Router) {
    
  }


  ngOnInit(): void {
    this.registerForm.reset();
  }
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('',
                     [Validators.required,
                     Validators.minLength(4),
                     matchValidator('confirmpassword', true)
                    ]),
      confirmpassword: new FormControl('', [Validators.required, matchValidator('password')]),
    }),
    birthdate: new FormControl(new Date()),
    gender: new FormControl('', Validators.required),
  });


  /*[(ngModel)] doesnot work with ReactiveForm ie., when we used formcontolname. In order to bind two way data binding we need to assign form values
   to model using functions as below*/
  get bindFormToModel(): any {

    var body = {
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwords.password,
      birthdate: this.registerForm.value.birthdate,
      gender: this.registerForm.value.gender,
    };
    return body;
  }

    public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
    this.registerForm.controls.username.setErrors(null);
    this.registerForm.controls.firstname.setErrors(null);
    this.registerForm.controls.lastname.setErrors(null);
    this.registerForm.controls.email.setErrors(null);
    this.registerForm.get('passwords')?.get('password')?.setErrors(null);
    this.registerForm.get('passwords')?.get('confirmpassword')?.setErrors(null);
    this.registerForm.controls.birthdate.setErrors(null);
    this.registerForm.controls.gender.setErrors(null);
  }
 

  closeAlert(){
    this.alert = false;
  }

   onSubmit() {
    this.submitted = true;
    this.bindFormToModel;
    this.regUser = this.bindFormToModel;
    console.log("user=", this.regUser);
    this.uService.register(this.regUser).subscribe(
      (res: any) => {
        console.log("response=", res);
        if (res.succeeded) {
          
          this.toastr.success('New User created', 'Registration successful');
          this.alert = true;
          this.onReset();
          this.router.navigateByUrl('user/app-login'); 
        } else {
          res.errors.forEach((element: any) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken', 'Registration Failed')
                break;
              case 'Unknown Error':
                this.toastr.error('Error communicating to the server');
                break;
              default:
                break
            }
          });
        }
      },
      (err: any) => {
        this.toastr.error('Server Error', 'ERR_CONNECTION_REFUSED')
        console.log("error=", err);
      }
    );
  }

}
