import { MessageService } from 'primeng/api';
import { NotificationService } from './services/notification.service';
import { LoadingService } from './services/loader.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'voice-master-ui-admin';
  items: any = [];
  loader: boolean;

  constructor(private loadingService: LoadingService, private notificationService: NotificationService, private spinner: NgxSpinnerService, private messageService: MessageService) { }

  ngOnInit() {
    this.subscribeLoader();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'dashboard'
      },
      {
        label: 'Billing',
        icon: 'pi pi-dollar',
        routerLink: 'billing'

      }
    ];
  }

  subscribeLoader() {
    this.loadingService.loader.subscribe((display) => {
      this.loader = display;
      if (display) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });

    //Subscribe toaster messages

    this.notificationService.successToastr.subscribe((message) => {
      console.log(message)
      this.messageService.add({ key: 'successToastr', severity: 'success', summary: 'Success', detail: message });

    });

    this.notificationService.errorToastr.subscribe((message) => {
      console.log(message)
      this.messageService.add({ key: 'errorToastr', severity: 'error', summary: 'Error', detail: message });
    });
  } 
}
