import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Form } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, finalize, map } from 'rxjs/operators';
import { Logger } from '../logger.service';
import { IimgName, LoadImages } from './loadImages.model';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class FileLoadService {

    ttl: any
    public message: string;
    public progress: number;
    private imageUrl: string;
    selectImage: any
    formDataImages: LoadImages = new LoadImages() ;
    @Output() public onUploadFinished = new EventEmitter();

    constructor(private logger: Logger, private http: HttpClient) {
        this.imageUrl = "http://localhost:5000/api/Image"
    }

    headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    GetFiles(): Observable<LoadImages[]> {
        return this.http.get<LoadImages[]>(this.imageUrl)
    };   

    // Retreive the images from the server
    GetPhotos(){
        return this.http.get<IimgName[]>(this.imageUrl + "/getPhotos");
    }

    // Upload Files
    AddFiles(selectImage: any, desc: any) {
        {
            const formData = new FormData();
            formData.append('Description', desc);
            formData.append('Image1', selectImage);
            console.log("req=" + this.imageUrl, formData);
            // const req = new HttpRequest(
            //  'POST',
            //  this.imageLoadUrl,
            //   formData,
            //   {
            //     reportProgress: true,
            //   }
            //  );
            this.http.post<LoadImages>(this.imageUrl + "/upload", formData, { reportProgress: true, observe: 'events' })
                .subscribe(res => {
                    if (res.type === HttpEventType.UploadProgress) {
                        this.ttl = res.total;
                        this.progress = Math.round(100 * res.loaded / this.ttl);
                    }
                    else if (res.type === HttpEventType.Response) {
                        this.message = "Upload successful";
                        this.onUploadFinished.emit(res.body);
                    }
                    console.log(res)
                });
        }
    }

  //  public fileDownload1() {
  //      return this.http.get(this.imageUrl + "/download", {});
  //  }

   // Download files
    public fileDownload(fileUrl: string) : Observable<Blob> {
        return this.http.get(`${this.imageUrl}/download?fileUrl=${fileUrl}`, {
            reportProgress: true,
            responseType: 'blob',
        });
    }

    // Image path in the server
    public ImgPathInServer = (serverPath: string) => {
        console.log("serverPath="+ this.imageUrl + "/" + serverPath);
        return this.imageUrl + serverPath;
      }

    AddImages1(fData: any) {
        const httpOptions = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'multipart/form-data; image/jpeg; application/json', }) };
        var options = { content: fData };
        console.log(fData);
        fData.forEach((value: any, key: any) => {
            console.log("key %s: value %s", key, value);
        })
        //console.log(desc);
        return this.http.post(this.imageUrl, options)
            .pipe(
                retry(1),
                catchError(this.processError));

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

}