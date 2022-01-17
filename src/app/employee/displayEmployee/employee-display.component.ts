import { UserService } from './../../shared/user.service';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { employee } from "src/app/shared/employee.model";


@Component({
  selector: 'emp-display',
  templateUrl: './employee-display.component.html',
  styles: ['./employee-display.component.css']
})
export class EmployeeDisplay implements OnInit {

  selectedCustomer: employee = new employee();

  //employee_datas: employee[] = [{ "id": 1, "name": "John", "email": "j@gmail.com", "gender": "male", "status": "active", "phone": "1-222-333-2345", "address": "Springfield, VA" }, { "id": 2, "name": "Jun", "email": "ju@outlook.com", "gender": "Female", "status": "Active", "phone": "2223334445", "address": "MD" }, { "id": 3, "name": "kim", "email": "k@gmail.com", "gender": "Female", "status": "Active", "phone": "12345", "address": "VA" }, { "id": 4, "name": "Kumud", "email": "Kunal1@hotmail.com", "gender": "string", "status": "string", "phone": "string", "address": "string" }, { "id": 5, "name": "Kiran", "email": "string", "gender": "string", "status": "string", "phone": "string", "address": "string" }, { "id": 7, "name": "Anu", "email": "anu@gmail.com", "gender": "Female", "status": "Active", "phone": "123456789", "address": "MD" }, { "id": 8, "name": "Sima", "email": "string", "gender": "string", "status": "string", "phone": "string", "address": "string" }, { "id": 10, "name": "SUN", "email": "s@outlook.com", "gender": "Male", "status": "Inactive", "phone": "12121221", "address": "Texas" }, { "id": 11, "name": "string", "email": "string", "gender": "string", "status": "string", "phone": "string", "address": "string" }, { "id": 12, "name": "Rishi123", "email": "s@outlook.com", "gender": "Male", "status": "Inactive", "phone": "12121221", "address": "Texas" }, { "id": 13, "name": "Jenisha", "email": "J@outlook.com", "gender": "FeMale", "status": "Inactive", "phone": "12121221", "address": "Texas" }, { "id": 14, "name": "abvc", "email": "abc@gmail.com", "gender": "Female", "status": "active", "phone": "4436003884", "address": "4639 Carisbrooke lane" }, { "id": 15, "name": "Amita Kunwar", "email": "amitak.ameeta@gmail.com", "gender": "Male", "status": "active", "phone": "4436003884", "address": "4639 Carisbrooke lane" }];
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status', 'phone', 'address', 'Edit', 'Delete'];
  dataSource = new MatTableDataSource<employee>();
  //dataSource = this.employee_datas;
  displayElement = false;
  dataToEdit: string;
  selectedRecord: number;
  dataSaved = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public userService: UserService, private router: Router) {

  }
  ngOnInit(): void {
    this.loadAllEmployees();
    this.dataSource.paginator = this.paginator;
  }

  showDetails(employee: employee) {
    this.selectedCustomer = Object.assign({}, employee)
    console.log(this.selectedCustomer);
  }

  resetForm() {
    // this.form.reset;
    this.userService.formDataEmp = new employee();
  }

  update(e: employee) {
    console.log(e);
    this.userService.updateEmployee(e).subscribe(res => {
      alert("Customer Updated.")
    },
      err => { console.log(err); })
    //var cust=this.employee_datas.find(e => e.id==customer.id)
    //Object.assign(cust,customer)

  }


  loadAllEmployees() {
    //this.dataSource;
    this.userService.GetAllEmployee().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })


  }
  onFormSubmit() {
    console.log(this.displayElement);
  }

  deleteEmployee(employeeId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.userService.deleteEmployeeById(employeeId).subscribe(() => {
        this.dataSaved = true;
        //this.SavedSuccessful(2);
        this.loadAllEmployees();
        // this.employeeIdUpdate = null;
        //  this.employeeForm.reset();

      }
      );
    }
  }

  PopulateFormData(selectedData: employee) {
    this.userService.formDataEmp = selectedData;
  }

  loadEmployeeToEdit(e: number) {
    //    this.router.navigateByUrl('/edit-employee', selectedRecord);
    this.displayElement = true;
    console.log(this.displayElement, e);
    this.selectedRecord = e;
  }

}
