import { LoadImages } from './../shared/loadImages.model';
import { FileLoadService } from './../shared/fileload.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";

@Component({
    selector:'app-home',
    templateUrl: './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent implements OnInit{

    imageFromDB : LoadImages[];
    imgUrl : any

    constructor(private fileService : FileLoadService){
      //  this.GetImg();
    }
    ngOnInit(): void {
       // this.GetImg();
    }

    //GetImg(){
    //   return this.fileService.GetImages().subscribe(res=>{
     //   this.imageFromDB = res;        
    //    console.log("Image Response=" + this.imageFromDB);
     //  });
   // }



}