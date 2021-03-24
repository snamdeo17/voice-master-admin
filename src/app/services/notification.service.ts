import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

const successConfig = {
  timeOut: 3000,
  progressBar: true,
  tapToDismiss: true
};
const errorConfig = {
  timeOut: 10000,
  autoDismiss: false,
  closeButton: true
};
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public errorToastr: Subject<any> = new Subject<any>();
  public successToastr: Subject<any> = new Subject<any>();


  constructor() { }

  showInfo() {
    // this.toastr.info('Hello world!', 'Toastr fun!');
  }
  showWarning() {
    // this.toastr.warning('Hello world!', 'Toastr fun!');
  }
  showSuccess(message) {
    // this.toastr.success(message, 'Success..!!', successConfig);
    this.successToastr.next(message);
  }
  showError(message) {
    //   this.toastr.success('Hello world!', 'Toastr fun!');
    // this.toastr.error(message, 'Error', errorConfig);
    this.errorToastr.next(message);
  }
}
