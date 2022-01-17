import { state } from '@angular/animations';
import { Router } from '@angular/router';
import { ShoppingWish } from './shopping-wish.Model';
import { employee } from 'src/app/shared/employee.model';
import { UserInformation } from 'src/app/shared/user-information.model';
import { BehaviorSubject, empty, Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { Logger } from "../logger.service";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { registerUser } from './registerUser.model';
import { ShoppingList } from './shoppingList.model';
import { ShoppingItem } from './shoppingItem.model';
import { SearchItem } from './searchItem.model';
import { SingleShoppingItem } from './singleShoppingItem.model';
import { UserExpenses } from './expense.model';




@Injectable({
  providedIn: 'root'
})

export class UserService  {

  private mainApiUrl: string;
  private createEmployeeApiUrl: string;
  private authenticateUserApiUrl: string;
  private shoppingBaseURL : string
  list: employee[];

    //User login Properties
    private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
    //private userName = new BehaviorSubject<string>('test');

 
  constructor(private logger: Logger, private http: HttpClient, private route : Router) {
    this.mainApiUrl = "https://gorest.co.in/public/v1/users";
    this.createEmployeeApiUrl = "http://localhost:82/api/Employees"
    this.authenticateUserApiUrl = "http://localhost:81/api"
    this.shoppingBaseURL = "http://localhost:82/api/Shopping"

  }

  formData: UserInformation = new UserInformation();
  formDataEmp: employee = new employee();
  fResgister: registerUser = new registerUser();


  public sendGetRequest() {
    return this.http.get<UserInformation[]>(this.mainApiUrl)
      .pipe(
        retry(1),
        catchError(this.processError));
  }

  CreateUserRequest(_userInfoItfc: UserInformation): Observable<UserInformation> {
    const httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer d5e9d80b31a73f7811c2c7f2bb943106fde8bfbf517f3b501a98a0ff6520e565' }) };
    return this.http.post<UserInformation>(this.createEmployeeApiUrl,
      _userInfoItfc, httpOptions).pipe(
        retry(1),
        catchError(this.processError));
  }
  AddEmployee() {
    return this.http.post(this.createEmployeeApiUrl, this.formDataEmp).pipe(
      retry(1),
      catchError(this.processError));
  }
  GetAllEmployee(): Observable<employee[]> {
    return this.http.get<employee[]>(this.createEmployeeApiUrl);
  }
  getEmployeeById(employeeId: string): Observable<employee> {
    return this.http.get<employee>(this.createEmployeeApiUrl + employeeId);
  }

  updateEmployee(emp: employee): Observable<employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<employee>(this.createEmployeeApiUrl + '/' + emp.id, emp, httpOptions);
  }

  deleteEmployeeById(employeeId: string): Observable<number> {
    return this.http.delete<number>(this.createEmployeeApiUrl + '/' + employeeId);
  }

  deleteData(user: employee[]): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<string>(this.createEmployeeApiUrl + user, httpOptions);
  }


  refreshList() {
    this.http.get(this.createEmployeeApiUrl)
      .toPromise()
      .then(res => this.list = res as employee[]);
  }
  AddUser1() {
    return this.http.post(this.createEmployeeApiUrl, this.formData);
  }

  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }

  getUser(): any {
    this.logger.log('Getting users...')
  }


  register(formResgister: any) {
    console.log("Register=", this.authenticateUserApiUrl + '/ApplicationUser/Register', formResgister);
    return this.http.post(this.authenticateUserApiUrl + '/ApplicationUser/Register', formResgister);
  }

  login(formData: any) {
    localStorage.setItem('token','1');
    return this.http.post(this.authenticateUserApiUrl + '/ApplicationUser/Login', formData).pipe(
      map((result : any) => {
        console.log("result token=",result.token);
        if(result){
          console.log("1");
          localStorage.setItem('token', result.token);
          console.log("2");
          localStorage.setItem('loginStatus', '1');   
          localStorage.setItem('userName', '1');  

        }
      })
    )
  }

  checkLoginStatus() : boolean{
    return false;
  }

  isLoggedIn(){
    this.loginStatus.next(localStorage.getItem('token')!=null || localStorage.getitem('token') != '');
    return  this.loginStatus.asObservable();
  }

  logOut(){
    this.loginStatus.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.setItem('loginStatus', '0');
    localStorage.removeItem('UserId');
    this.route.navigateByUrl('/user/app-login');
  }

  getUserProfile(savedtoken : any) {
    console.log("User Profile");
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    return this.http.get(this.authenticateUserApiUrl + '/UserProfile',{headers: tokenHeader});
  }

  PostShoppingWish(body:any){
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
  //  console.log("post wish=",this.shoppingBaseURL,body,{headers: tokenHeader});
    return this.http.post(this.shoppingBaseURL,body,{headers: tokenHeader});
  }
  getShoppingCategoryList(username : any) : Observable<ShoppingList[]>{
    let params = new HttpParams().set("username", username);
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
   // console.log(this.shoppingBaseURL +'/MyCategoryList'+ "/" + username,{headers: tokenHeader})
    return this.http.get<ShoppingList[]>(this.shoppingBaseURL +'/MyCategoryList',{headers: tokenHeader , params});
  }

  getMyShoppingItems(username : any, categoryName : any) : Observable<ShoppingItem[]>{
    let params = new HttpParams().set("username", username).set("categoryName", categoryName);
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
  //  console.log(this.shoppingBaseURL +'/MyShoppingItems' ,{ params} );
    return this.http.get<ShoppingItem[]>(this.shoppingBaseURL +'/MyShoppingItems',{headers: tokenHeader , params} );
  }

  searchItem(body : any){
    var tokenHeader = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer ' + localStorage.getItem('token')});
   // console.log("url=",this.shoppingBaseURL + '/SearchItem', body,{headers: tokenHeader});
    return this.http.post(this.shoppingBaseURL + '/SearchItem', body,{headers: tokenHeader});
  }

  getAllItem(body : any): Observable<SearchItem[]>{
    console.log("body=", body);
    var tokenHeader = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer ' + localStorage.getItem('token')});
   // console.log("url=",this.shoppingBaseURL + '/GetAllShoppingItem', {headers: tokenHeader});
    return this.http.post<SearchItem[]>(this.shoppingBaseURL + '/GetAllShoppingItem' , body, {headers: tokenHeader});
  }

  getUserExpense(username : any): Observable<UserExpenses>{
    console.log("Get User Expense=",username);
    let params = new HttpParams().set("username", username);
    var tokenHeader = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer ' + localStorage.getItem('token')});
    //console.log("Expense url=",this.shoppingBaseURL + '/GetAllShoppingItem', {headers: tokenHeader});
    return this.http.get<UserExpenses>(this.shoppingBaseURL + '/GetUserTotalExpense' , {headers: tokenHeader , params});
  }

  getIndividualShoppingItem(Id: any): Observable<SingleShoppingItem>{
    
    var tokenHeader = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer ' + localStorage.getItem('token')});
   // console.log("single Item URL=",this.shoppingBaseURL + "/" +Id, {headers: tokenHeader } );
    return this.http.get<SingleShoppingItem>(this.shoppingBaseURL + "/" +Id, {headers: tokenHeader } );
  }

  updateItem(item: SingleShoppingItem): Observable<SingleShoppingItem> {
    var tokenHeader = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Bearer ' + localStorage.getItem('token')});
    console.log("Update=",this.shoppingBaseURL + "/" +item.id + item,{headers: tokenHeader});
    return this.http.put<SingleShoppingItem>(this.shoppingBaseURL + "/" +item.id , item,{headers: tokenHeader});
  }

  deleteItemById(id: string): Observable<number> {
    return this.http.delete<number>(this.shoppingBaseURL + '/' + id);
  }

  

}