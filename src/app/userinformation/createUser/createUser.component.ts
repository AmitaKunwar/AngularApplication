import { UserService } from './../../shared/user.service';
import { UserInformation } from './../../shared/user-information.model';
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector : 'cu-createUser',
    templateUrl : './createUser.Component.html',
    styleUrls : ['./createUser.component.css']
})

export class CreateUserComponent implements OnInit {
//  user :UserInformationInterface
//  @Input() userObj = { name: '', email: '', gender: '', status: '' }
    constructor(public userService : UserService, private formBuilder : FormBuilder, private router: Router){

    }
    ngOnInit(): void {
        
    }

    addUser1(data: any) {
     // this.userSer.addUser(this.userObj).subscribe((data: {}) => {
      //  this.router.navigate(['/ui-userinfo'])
     // })
    }
    onSubmit(form:NgForm){
        this.userService.AddEmployee().subscribe(
            res=>{
                this.resetForm(form);
            },
            err => { console.log(err);}
        );
    }

    resetForm(form:NgForm){
        form.form.reset();
        this.userService.formData = new UserInformation();
    }

    //addUser(usritf: UserInformationInterface): void {
   // console.log(usritf.name);
   // this.userSer.CreateUserRequest(usritf).subscribe((data: {}) => {
    //  this.router.navigate(['/ui-userinfo'])
    //});
 }
