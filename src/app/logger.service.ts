import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class Logger{
    logs: string[] = []; // capture logs 

    writeCount(count : number){
        console.warn(count);
    }

    log(message : string){
        this.logs.push(message);
        console.log(message);
    }
}


