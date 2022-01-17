import { ShoppingItem } from './../../shared/shoppingItem.model';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IDataOptions, IDataSet } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { ShoppingList } from 'src/app/shared/shoppingList.model';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { userProfile } from 'src/app/shared/userProfile.model';

const USER_SCHEMA = {
  "Description": "string",
  "Price": "number",
  "isEdit": "isEdit"
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShoppingListComponent implements OnInit {

  _shoppingItem : ShoppingItem = new ShoppingItem();
  displayedColumns: string[] = ['categoryname', 'price'];
 // innerDisplayedColumns = ['description', 'price','Edit','Delete'];
 innerDisplayedColumns : string[] = ['itemName', 'itemPrice'];
  dataSource = new MatTableDataSource<ShoppingList>();
  innerDataSource = new MatTableDataSource<ShoppingItem>();
  displayChildItem : boolean = false;
  items : ShoppingItem[]
  slist : ShoppingList;
  expandedElement: ShoppingList | null;
  uProfile : userProfile = new userProfile();
 

  constructor(private _service : UserService) { 
    
  }

  ngOnInit(): void {
    {
      this.displayChildItem = false;
      this.DisplayShoppingList();
      this.dataSource.paginator = this.paginator;
     
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  DisplayShoppingList() {
    let username = localStorage.getItem('username');
    this._service.getShoppingCategoryList(username).subscribe(res=>
      {
        console.log("shopping category=",res);
        this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      },
      err=>{
        console.log(err);
      })
  }

  toggleDown2(catName : any){
    this.displayChildItem = true;
   }
  toggleDown(catName : any){
   // console.log("category Name=",catName);
    let username = localStorage.getItem('username');
      this._service.getMyShoppingItems(username,catName).subscribe(res=>{       
      if(res.length > 0){
        this.displayChildItem = true;
        this.items = res;
        console.log(res);
        this.innerDataSource = new MatTableDataSource(res);
      }
    },
    err =>{
      console.log(err);
    })
  }

  toggleUP(){
     this.expandedElement = null;
    this.displayChildItem = false;
   // console.log("DisplayChildItem=",this.displayChildItem);
   // console.log("this.expandedElement=",this.expandedElement);
  }
}
