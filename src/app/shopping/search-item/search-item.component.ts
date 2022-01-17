import { EditShoppingListComponent } from './../edit-shopping-list/edit-shopping-list.component';
import { logging } from 'protractor';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SearchItem } from 'src/app/shared/searchItem.model';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingCategory } from 'src/app/shared/shoppingCategory.model';
import { userProfile } from 'src/app/shared/userProfile.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { createIdentifier } from 'typescript';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})
export class SearchItemComponent implements OnInit {

  fileNameDialogRef: MatDialogRef<EditShoppingListComponent>;
  userId : any = null;
  username : any = null;
  displayedColumns: string[] = ['Id', 'itemname', 'shoppingdescription', 'itemprice', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<SearchItem>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchItem: SearchItem = new SearchItem();
  uProfile : userProfile = new userProfile();
  submitted = false;
  sCategories: ShoppingCategory[] = [
    { value: '1', viewValue: 'Clothes' },
    { value: '2', viewValue: 'Grocery' },
    { value: '3', viewValue: 'Kitchen Utensil' },
    { value: '4', viewValue: 'Other' },
  ];

  constructor(private _service: UserService, private route: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    //console.log("uname=",localStorage.getItem('username'));
    this.dataSource.paginator = this.paginator;
    this.searchForm.controls['categoryName'].setValue('null');
    this.searchForm.controls['itemName'].setValue('search by item');
    this.searchForm.controls['itemPrice_1'].setValue('0');
    this.searchForm.controls['itemPrice_2'].setValue('0');
    this.userId = localStorage.getItem('UserId');
  }

  searchForm = new FormGroup({
    userId : new FormControl(),
    categoryName: new FormControl(''),
    itemName: new FormControl(''),
    itemPrice_1: new FormControl(''),
    itemPrice_2: new FormControl('')
  })

  get fBody(): any {
    var formValue = {
      userId : this.userId,
      categoryName: this.searchForm.value.categoryName,
      itemName: this.searchForm.value.itemName,
      itemPrice_1: this.searchForm.value.itemPrice_1,
      itemPrice_2: this.searchForm.value.itemPrice_2,
    }
    return formValue;
  }

  openDialog(Id:any ) {
    this.fileNameDialogRef = this.dialog.open(EditShoppingListComponent,{
      minHeight:'400px',
      minWidth:'500px',
      data:Id,
    });
  }

   onReset(): void {
    this.submitted = false;
    this.searchForm.reset();
    this.searchForm.controls['categoryName'].setValue('null');
    this.searchForm.controls['itemName'].setValue('search by item');
    this.searchForm.controls['itemPrice_1'].setValue('0');
    this.searchForm.controls['itemPrice_2'].setValue('0');
  }

  OnSubmit() {
    //
    this.submitted = true;
    this.searchItem = this.fBody ;
    this._service.searchItem(this.searchItem).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    },
      err => {
        console.log(err);
      })
  }

  loadItems() {
    console.log("de=",this.fBody);
    this._service.getAllItem(this.fBody).subscribe((data: any) => {
      console.log("after delete=",data)
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    },
      (err: any) => {
        console.log(err);
      })
    }
  


  deleteItem(id: string): void {
    if (confirm("Are you sure you want to delete this ?")) {
      this._service.deleteItemById(id).subscribe(() => {
        this.loadItems();
        // this.dataSaved = true;
        //this.SavedSuccessful(2);
        // this.loadAllEmployees();
        // this.employeeIdUpdate = null;
        //  this.employeeForm.reset();

      }
      );
    }
  }


}
