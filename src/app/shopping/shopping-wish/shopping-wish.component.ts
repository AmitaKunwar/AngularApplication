import { Router } from '@angular/router';
import { ShoppingWish } from './../../shared/shopping-wish.Model';
import { UserService } from 'src/app/shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ShoppingCategory } from 'src/app/shared/shoppingCategory.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shopping-wish',
  templateUrl: './shopping-wish.component.html',
  styleUrls: ['./shopping-wish.component.css']
})
export class ShoppingWishComponent implements OnInit {

  alert : boolean = false;
  shoppingWish : ShoppingWish  = new ShoppingWish();
  userId : any = null;

  sCategories: ShoppingCategory[] = [
    {value: '1', viewValue: 'Clothes'},
    {value: '2', viewValue: 'Grocery'},
    {value: '3', viewValue: 'Kitchen Utensil'},
    {value: '4', viewValue: 'Other'},
  ];
  constructor(private _service : UserService, private router : Router, private toastr: ToastrService) { }

  ngOnInit(): void {
     this.userId = localStorage.getItem('UserId');
  }

  scForm =  new FormGroup({
    userId : new FormControl(),
    categoryID : new FormControl('',Validators.required),
    shoppingDescription : new FormControl('',Validators.required),
    itemPrice : new FormControl('',Validators.required),
    itemName : new FormControl('',Validators.required)
  })

  get fBody(): any {
    var formValue = {
      userId : this.userId,
      shoppingDescription : this.scForm.value.shoppingDescription,
      itemPrice : this.scForm.value.itemPrice,
        categoryID : this.scForm.value.categoryID,
        itemName :  this.scForm.value.itemName,
    }
    return formValue;  
  }

  onReset(): void {
   // this.submitted = false;
    this.scForm.reset();
    this.scForm.controls.shoppingDescription.setErrors(null);
    this.scForm.controls.itemPrice.setErrors(null);
    this.scForm.controls.categoryID.setErrors(null);
    this.scForm.controls.itemName.setErrors(null);
  }

  closeAlert(){
    this.alert = false;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.scForm.controls[controlName].hasError(errorName);
  }

  OnSubmit(){
    this.shoppingWish = this.fBody 
   // console.log( this.shoppingWish);
       this._service.PostShoppingWish(this.shoppingWish).subscribe((res: any)=>{
      console.log("res=",res);
     
        console.log(this.alert);
         this.alert = true;
         this.toastr.success('Shopping Wish', 'New Shopping wish created successfully');
          this.onReset();
          this.router.navigateByUrl('app-shopping/app-shopping-list');   
     
    },
    (err : any) =>{
      console.log(err);
    });
 
  }


}
