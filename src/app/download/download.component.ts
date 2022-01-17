import { FileLoadService } from './../shared/fileload.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  message : string
  progress  : number

  @Input() public fileUrl: string;

  constructor(private fileService : FileLoadService) { }

  ngOnInit(): void {
  }

  download() {
    this.fileService.fileDownload(this.fileUrl).subscribe(blob => {
     
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = this.fileUrl;
        a.click();
        URL.revokeObjectURL(objectUrl);
    },
    (error: any) => console.log('Error downloading the file')
    );
}

}
