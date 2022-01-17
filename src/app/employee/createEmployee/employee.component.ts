import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { employee } from '../../shared/employee.model';
import { Gender } from '../Gender';
import { MatPaginator } from '@angular/material/paginator';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: [
  ]
})
export class EmployeeComponent implements OnInit {
  genderList: any = ['Female', 'Male']
  sort: any;
  constructor(public userService : UserService) { 
    
  }

  ngOnInit(): void {
    
  }
 
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    gender: new FormControl('', Validators.required),
    status:new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    
  });

  resetForm(){
    this.form.reset();
   // this.userService.formDataEmp = new employee();
  }
  
  get f(){
    return this.form.controls;
  }

 
  submit(){
    this.userService.AddEmployee().subscribe(
      res=> {
        alert("User added successfully.");
        this.resetForm();
      },
      err=>{console.log(err);}
    )
    console.log(this.form.value);
  }
  changeWebsite(e : any) {
    console.log(e.target.value);
  }

  ChangeGender(e: any){
    console.log(e.target.value);
  }
  ChangeStatus(e: any){
    console.log(e.target.value);
  }

}