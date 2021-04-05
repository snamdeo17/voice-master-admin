import { Validators, FormBuilder } from '@angular/forms';
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
  createConsumerFrm = this.fb.group({
    userId: ['', Validators.required],
    type: ['', Validators.required]
  });
  billingTypes: any = [];
  custActionItems: any = [];
  manageCustDialog: boolean;
  selectedCust: any = [];
  conIds: any = [];
  constructor(private restService: RestService, private messageService: MessageService, private router: Router, private fb: FormBuilder) {
    this.billingTypes = [
      { name: 'Electricity', id: 'electricity' },
      { name: 'Water', id: 'water' },
      { name: 'Gas', id: 'gas' }
    ];



  }


  ngOnInit() {
    this.getCustomers();
    this.custActionItems = [
      { label: 'Consumer Details', id: 'consumerDetails' },
      { label: 'Other Details', id: 'otherconsumerDetails' }

    ];
  }

  getCustomers(): void {
    let getData: any = {};
    getData.url = '/api/customer';
    this.restService.getData(getData)
      .subscribe((data: any) => {
        this.customers.list = data;
        this.customers.display = true;
      });
  }

  rowAction(act, data): void {
    if (act == 'createBill') {
      this.router.navigate(['/billing'], { queryParams: { action: 'createBill', userId: data.userId } });
    }
  }


  manageCustomer(customer): void {
    this.createConsumerFrm.controls.userId.setValue(customer.userId);
    this.selectedCust = [];
    this.selectedCust.push(customer)
    this.conIds = [];
    this.getConIds();
    this.manageCustDialog = true;
  }
  //conIds GET /api/bill/createConsumerUserMap/{userId
  getConIds(): void {
    let getData: any = {};
    getData.url = '/api/bill/createConsumerUserMap/' + this.selectedCust[0].userId;
    this.restService.getData(getData)
      .subscribe((data: any) => {
        this.conIds = data;
      });
  }
  createConsumer() {
    let postData: any = {};
    postData.url = '/api/bill/createConsumerUserMap';
    postData.data = this.createConsumerFrm.value;
    postData.data.type = this.createConsumerFrm.value.type.id;
    this.restService.postData(postData)
      .subscribe((data: any) => {
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Success', detail: data.description });
        this.getConIds();
        this.resetCreateConIdFrm()
      });
  }

  resetCreateConIdFrm(): void {
    this.createConsumerFrm.reset();
    if (this.manageCustDialog) {
      this.createConsumerFrm.controls.userId.setValue(this.selectedCust[0].userId);

    }
  }
}

