import { UserExpenses } from './../shared/expense.model';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { userProfile } from '../shared/userProfile.model';
import { ShoppingList } from '../shared/shoppingList.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userdetailinPC: userProfile = new userProfile();
  myCategory: UserExpenses = new UserExpenses();
  totalPrice: any;
  a1: number[] = [1, 2, 3, 4, 5, 6];
  LoginStatus$ : Observable<boolean>;
  //uname = localStorage.getItem('username');
  username1 : any

  constructor(private router: Router, private service: UserService) {
    this.service.getUserProfile(this.getTokenFromLocalStorage).subscribe(
      (res: any) => {
        this.userdetailinPC = res;
         localStorage.setItem('username', this.userdetailinPC.userName.toString());
        localStorage.setItem('UserId', this.userdetailinPC.id.toString());
        //console.log("Userprofile=", res);
        // console.log("UserId=", this.userdetailinPC.id.toString());
        this.username1 = localStorage.getItem('username');
        this.service.getUserExpense(this.username1).subscribe((res: any) => {
          this.myCategory = res;
          this.totalPrice = this.myCategory.totalPrice;
        //  console.log("Dashboard price=", res);
         // console.log("Dashboard myCategory=", this.myCategory);
         // console.log("Dashboard price1=", this.totalPrice);
    
        },
          (err: any) => { console.log(err) });

      },
      err => {
        console.log(err);
      },
    );
    

    this.LoginStatus$ = this.service.isLoggedIn();
    
  }

  ngOnInit(): void {

 }

 
  getTokenFromLocalStorage() {
    return localStorage.getItem('token');
  }

  onLogOut() {
    this.service.logOut();
   // localStorage.removeItem('token');
    this.router.navigateByUrl('/user/app-login');
  }

}
