import { UserService } from 'src/app/shared/user.service';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchItem } from 'src/app/shared/searchItem.model';
import { SingleShoppingItem } from 'src/app/shared/singleShoppingItem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css']
})
export class EditShoppingListComponent implements OnInit {

  eachItem: SingleShoppingItem = new SingleShoppingItem();

  constructor(private router : Router,private _service: UserService, public dialogRef: MatDialogRef<EditShoppingListComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: SearchItem) {
    // console.log("data=",data);
    this._service.getIndividualShoppingItem(data).subscribe((res: any) => {
      this.eachItem = res;
     // console.log("edit1=", this.eachItem);
      this.editForm.patchValue({ id: this.eachItem.id });
      this.editForm.patchValue({ itemName: this.eachItem.itemname });
      this.editForm.patchValue({ shoppingDescription: this.eachItem.shoppingDescription });
      this.editForm.patchValue({ itemPrice: this.eachItem.itemPrice });
      this.editForm.patchValue({ userId: this.eachItem.userID });
      this.editForm.patchValue({ categoryID: this.eachItem.categoryID });
      
    },
      (err: any) => {
        console.log(err)
      })
  }

  ngOnInit(): void {
  }


  editForm = new FormGroup({
    id: new FormControl(),
    itemName: new FormControl(''),
    shoppingDescription: new FormControl(''),
    itemPrice: new FormControl(''),
    userId: new FormControl(),
    categoryID : new FormControl(),
  })

  get fBody(): any {
    var formValue = {
      id: this.editForm.value.id,
      itemName: this.editForm.value.itemName,
      shoppingDescription: this.editForm.value.shoppingDescription,
      itemPrice: this.editForm.value.itemPrice,
      userId: localStorage.getItem('UserId'),
      categoryID : this.editForm.value.categoryID,

    }
    return formValue;
  }

  onReset(): void {
    this.editForm.reset();
  }

  onCloseDialog() {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(this.editForm.value);
  }

  OnSubmit(){
    this.eachItem = this.fBody;
    //console.log(this.eachItem);
    this._service.updateItem(this.eachItem).subscribe((res:any) =>{
      console.log("update response=",res);
      this.editForm.reset;
      this.router.navigateByUrl('app-shopping/app-shopping-list'); 
      this.dialogRef.close(this.editForm.value);
    },
    (err : any) =>{
      console.log(err);
    });
  }
}
