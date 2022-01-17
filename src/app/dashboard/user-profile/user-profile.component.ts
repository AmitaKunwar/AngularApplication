import { userProfile } from './../../shared/userProfile.model';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/shared/shoppingList.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userDetails: any;
  @Input() totalItemsPrice : any;
  shoppingList : ShoppingList
  total : number
  a1: number[] = [1, 2, 3, 4, 5, 6];
  constructor() { 
   
  }

  ngOnInit(): void {
    console.log("user-profile");
    this.test();
  }

  test() {
    console.log("1=");
    for (var index in this.totalItemsPrice) {
      console.log("index1=", this.totalItemsPrice[index]);
    if (this.totalItemsPrice[index] != null) {
      let test = this.a1.reduce((prevval: any, currval) => {
        return currval;
      }, 0);
      console.log("test1=", test);
    }
  }
  }

 

}
