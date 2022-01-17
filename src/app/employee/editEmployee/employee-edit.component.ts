import { Gender } from './../Gender';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { employee } from 'src/app/shared/employee.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'edit-employee',
  templateUrl: './employee-edit.component.html',
  styleUrls: []
})

export class EditEmployee implements OnInit {
  @Input() emp: employee = new employee();
  @Output() empChange: EventEmitter<employee> = new EventEmitter<employee>();
  userId: any
  userDetails: any
  genderList: any = ['Female', 'Male']
  sort: any;
  constructor(public empService: UserService, private activatedRoute: ActivatedRoute) {
    console.log(this.emp.name);
  }

  ngOnInit(): void {
  
  }

  //Raise the event using the emit method.
  updateEmployee() {
    this.empChange.emit(this.emp);
  }

  ChangeGender(e: any) {
    console.log(e.target.value);
  }
  ChangeStatus(e: any) {
    console.log(e.target.value);
  }

}