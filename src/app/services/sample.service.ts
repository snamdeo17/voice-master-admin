import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";



@Injectable({providedIn:'root'})
export class Sample {
    private messageService = new BehaviorSubject<string>('');
    currentMessage = this.messageService.asObservable();



    setData(data){
        this.messageService.next(data)
    }
}