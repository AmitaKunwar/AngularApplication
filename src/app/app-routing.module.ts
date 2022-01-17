import { ShoppingWishComponent } from './shopping/shopping-wish/shopping-wish.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { DownloadComponent } from './download/download.component';
import { HomeComponent } from './Home/home.component';
import { EditEmployee } from './employee/editEmployee/employee-edit.component';
import { EmployeeComponent } from './employee/createEmployee/employee.component';
import { CreateUserComponent } from './userinformation/createUser/createUser.component';

import { AppComponent } from './app.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './userinformation/displayUserLists/userinfo.component';
import { EmployeeDisplay } from './employee/displayEmployee/employee-display.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { SearchItemComponent } from './shopping/search-item/search-item.component';
import { EditShoppingListComponent } from './shopping/edit-shopping-list/edit-shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/app-home', pathMatch: 'full' },
  { path: 'app-root', component: AppComponent },
  { path: 'ui-userinfos', component: UserInfoComponent },
  { path: 'cu-createUser', component: CreateUserComponent },
  { path: 'app-employee', component: EmployeeComponent },
  { path: 'emp-display', component: EmployeeDisplay },
  { path: 'edit-employee/:id', component: EditEmployee },
  { path: 'app-home', component: HomeComponent },
  { path: 'app-download', component: DownloadComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'app-user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'app-login', component: LoginComponent }
    ]
  },
  { path: 'app-signup', component: SignupComponent },
  {
    path: 'app-shopping', component: ShoppingComponent , canActivate: [AuthGuard],
    children:[
      {path:'app-shopping-wish', component : ShoppingWishComponent , canActivate: [AuthGuard]},
      {path: 'app-shopping-list',component : ShoppingListComponent , canActivate: [AuthGuard]},
      {path: 'app-search-item' , component : SearchItemComponent,canActivate:[AuthGuard]},
      {path: 'app-edit-shopping-list', component : EditShoppingListComponent , canActivate:[AuthGuard]}
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
