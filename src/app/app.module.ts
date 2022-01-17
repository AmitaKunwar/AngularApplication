import { UserService } from './shared/user.service';
import { HomeComponent } from './Home/home.component';
import { EditEmployee } from './employee/editEmployee/employee-edit.component';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CreateUserComponent } from './userinformation/createUser/createUser.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from './userinformation/displayUserLists/userinfo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeComponent } from './employee/createEmployee/employee.component';
import { EmployeeDisplay } from './employee/displayEmployee/employee-display.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTabsModule} from '@angular/material/tabs';
import { FileLoadService } from './shared/fileload.service';
import { DownloadComponent } from './download/download.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import {ToastrModule} from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './user/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingWishComponent } from './shopping/shopping-wish/shopping-wish.component';
import { SearchItemComponent } from './shopping/search-item/search-item.component';
import { EditShoppingListComponent } from './shopping/edit-shopping-list/edit-shopping-list.component';


@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    CreateUserComponent,
    EmployeeComponent,
    EmployeeDisplay,
    EditEmployee,
    HomeComponent,
    DownloadComponent,
    SignupComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    DashboardComponent,
    UserProfileComponent,
    ShoppingWishComponent,
    ShoppingComponent,
    ShoppingListComponent,
    SearchItemComponent,
    EditShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSidenavModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTableModule,
    CdkTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSelectModule,
    NgbModule,
    ToastrModule.forRoot({
     timeOut: 3500,
      positionClass: 'toast-center-right'
    })    
   
  ],
  providers: [UserService,
    FileLoadService, 
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
