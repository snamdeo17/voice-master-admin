import { RestService } from './../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any = {
    display: false,
    list: []
  };

  constructor(private restService: RestService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit() {
    this.getCustomers()
  }

  getCustomers(): void {
    let getData: any = {};
    getData.url = '/api/customer';
    this.restService.getData(getData)
      .subscribe((data: any) => {
        console.log(data)
        this.customers.list = data;
        this.customers.display = true;
      });
  }

  rowAction(act, data): void {
    if (act == 'createBill') {
      this.router.navigate(['/billing'], { queryParams: { action: 'createBill', userId: data.userId } });
    }
  }
}

