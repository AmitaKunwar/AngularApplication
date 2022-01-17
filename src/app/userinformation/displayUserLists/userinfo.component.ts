import { UserService } from './../../shared/user.service';
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserInformation } from "src/app/shared/user-information.model";


@Component({
    selector: 'ui-userinfos',
    templateUrl : './userinfo.component.html', 
    styleUrls: ['./userinfo.component.css'],
    providers: [ UserService]
})

export class UserInfoComponent implements OnInit{
  
      userList :UserInformation[] 
    constructor(private _userService: UserService) {
       
    }  

    columnDefs = [
        {headerName: 'ID', field: 'id'},
        {headerName: 'Name', field: 'name'},
        {headerName: 'Email', field: 'email'},
        {headerName: 'Gender', field: 'gender'},
        {headerName: 'Status', field: 'status'},
    ];
  
    ngOnInit() {  
       this._userService.sendGetRequest().subscribe((row_data : any) => {        
        this.userList = row_data.data;
         console.log(this.userList);     
    }) 
    }  

   
   
}  

