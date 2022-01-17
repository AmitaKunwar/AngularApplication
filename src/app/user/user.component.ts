import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styles: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public uService : UserService) { }

  ngOnInit(): void {
  }

}
