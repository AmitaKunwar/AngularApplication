import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { Logger } from './logger.service';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, empty, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbCarouselConfig],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'ng-carousel-demo';

  LoginStatus$ : Observable<boolean>;
	Username$ : Observable<string>;
 
  images = [
    { title: 'First Slide', short: 'First Slide Short', src: "../assets/images/6.jpg" },
    { title: 'Second Slide', short: 'Second Slide Short', src: "../assets/images/4.jpg" },
    { title: 'Third Slide', short: 'Third Slide Short', src: "../assets/images/8.jpg" }
  ];

  constructor(config: NgbCarouselConfig, private router: Router , private _service : UserService) {
    config.interval = 15000;
    config.keyboard = true;
    config.pauseOnHover = true;

  }
  ngOnInit() {
    this.LoginStatus$ = this._service.isLoggedIn();
   // this.Username$ = this._service.currentUsername();
  }
 
  isShow = false;
  openPage(pageName: string, elmnt: string, color: string) {

  }
  private hasToken(): boolean {
    return !localStorage.getItem('token');
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  uploadFinished(event: any) {
    this.response = event;
  }
  public response: { dbPath: '' };

  isUserLoggedIn(): boolean {
    if (localStorage.getItem('token') != null)
      return true;
    else
      return false;
  }

  onLogOut() {
    this._service.logOut();
   // localStorage.removeItem('token');
    //this.router.navigateByUrl('/user/app-login');
  }

}
