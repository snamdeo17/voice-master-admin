import { RestService } from './../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers: [DatePipe]
})
export class BillingComponent implements OnInit {

  billingTypes: any = [];
  selectedType: any = '';

  bills: any = {
    display: false,
    list: []
  };
  showSingleUserBill: any = {
    enabled: false
  }
  //selectedType = new FormControl('');

  createBillForm = this.fb.group({
    userId: ['', Validators.required],
    consumerId: ['', Validators.required],
    name: ['', Validators.required],
    amount: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private restService: RestService, private messageService: MessageService, private activatedRoute: ActivatedRoute) {

    this.billingTypes = [
      { name: 'Electricity', id: 'electricity' },
      { name: 'Water', id: 'water' },
      { name: 'Gas', id: 'gas' },
      { name: 'Others', id: 'other' }
    ];

  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      let action = params['action'] ? params['action'] : undefined;
      let userId = params['userId'] ? params['userId'] : undefined;
      console.log(action, userId)
      if (action && userId) {
        this.showSingleUserBill.enabled = true;
        this.showSingleUserBill.userId = userId;
        this.populateData(action, userId)
        this.getBills(userId);
      }
      else {
        // Fetch All bills;
        this.resetCreateBillForm();
        this.getBills();
      }
    });
  }

  populateData(action?: string, userId?: number) {
    if (action == 'createBill') {
      this.createBillForm.controls.userId.setValue(userId);
    }
  }


  getBills(userId?: number): void {
    let getData: any = {};
    getData.url = '/api/bill';
    this.showSingleUserBill.enabled = false;
    if (userId) {
      getData.url = '/api/bill/' + userId;
      this.showSingleUserBill.enabled = true;

    }
    this.restService.getData(getData)
      .subscribe((data: any) => {
        console.log(data)
        this.bills.list = data;
        this.bills.display = true;
      });
  }
  onSubmit() {
    let postData: any = {};
    postData.url = '/api/bill';
    postData.data = this.createBillForm.value;
    postData.data.name = this.createBillForm.value.name.id;
    console.log(postData)
    this.restService.postData(postData)
      .subscribe((data: any) => {
        console.log(data)
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Success', detail: 'Via MessageService' });
        this.resetCreateBillForm();
        if (this.showSingleUserBill.enabled) {
          this.getBills(this.showSingleUserBill.userId);
        }
        else {
          this.getBills();
        }
      });
  }
  resetCreateBillForm() {
    this.createBillForm.reset();
  }
}
