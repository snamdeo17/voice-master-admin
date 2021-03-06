import { RestService } from './../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { of, pipe } from 'rxjs'
import { filter, map } from 'rxjs/operators';

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
  userList: any = [];
  conIds: any = [];
  showSingleUserBill: any = {
    enabled: false
  }
  newAccess: boolean;

  //selectedType = new FormControl('');

  createBillForm = this.fb.group({
    userId: ['', Validators.required],
    consumerId: ['', Validators.required],
    // name: ['', Validators.required],
    amount: ['', Validators.required],
    dueDate: ['', Validators.required]
  });
  searchForm = this.fb.group({
    userId: ['', Validators.required]
  });
  dueDateMinDateValue: Date = new Date();


  constructor(private fb: FormBuilder, private restService: RestService, private messageService: MessageService, private activatedRoute: ActivatedRoute) {

    this.billingTypes = [
      { name: 'Electricity', id: 'electricity' },
      { name: 'Water', id: 'water' },
      { name: 'Gas', id: 'gas' }
    ];

  }

  ngOnInit() {

    const num = of(1, 2, 3, 4,);
    //const sqrVal = map((val: number) => val*val);
    const filterNums = pipe(
      filter((x:number)=> (x%2 !== 0)),
      map((n:number)=> n*n)

    )

    const sqrNum = filterNums(num);

   sqrNum.subscribe(x=>{console.log(x)})

    this.activatedRoute.queryParams.subscribe(params => {
      let action = params['action'] ? params['action'] : undefined;
      let userId = params['userId'] ? params['userId'] : undefined;
      if (action && userId) {
        this.showSingleUserBill.enabled = true;
        this.showSingleUserBill.userId = userId;
        this.getUsers(userId);
        this.getBills(userId);
        this.getConIds(userId);
      }
      else {
        // Fetch All bills;
        this.resetCreateBillForm();
        this.getUsers();
        this.getBills();
      }
    });
  }

  populateData(controlName?: string, value?: any) {
    if (controlName == 'userId') {
      this.createBillForm.controls.userId.setValue(value);
    }
    if (controlName == 'consumerId') {
      this.createBillForm.controls.consumerId.setValue(value);
    }
    //this.createBillForm.patchValue({ userId: value })
  }

  getUsers(userId?: number): void {
    let getData: any = {};
    getData.url = '/api/customer';
    if (userId) {
      getData.url = '/api/customer/' + userId;
    }
    this.restService.getData(getData)
      .subscribe((data: any) => {
        if (Array.isArray(data)) {
          this.userList = data;
        }
        else {
          this.userList = [];
          this.userList.push(data)
          this.populateData('userId', data);
        }
        this.userList.forEach(element => {
          //if (element) {
          element['displayName'] = element.fname + " " + element.lname + "(" + element.userId + ")";
          //}
        });
      });
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
        this.bills.list = data;
        this.bills.display = true;
      });
  }
  onSubmit() {
    console.log(this.createBillForm.value)
    let postData: any = {};
    postData.url = '/api/bill';
    postData.data = JSON.parse(JSON.stringify(this.createBillForm.value));
    postData.data.name = this.createBillForm.value.consumerId.type;
    postData.data.consumerId = this.createBillForm.value.consumerId.consumerId;
    postData.data.userId = this.createBillForm.value.userId.userId;
    console.log(postData)

    this.restService.postData(postData)
      .subscribe((data: any) => {
        console.log(postData)
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Success', detail: data.description });
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
  onSearch() {
    let userId = this.searchForm.value.userId;
    console.log(this.searchForm.value)
    this.getBills(userId);
  }
  resetresetSearchForm() {
    this.searchForm.reset();
    this.getUsers();
  }

  getConIds(userId: number): void {
    let getData: any = {};
    getData.url = '/api/bill/createConsumerUserMap/' + userId;
    this.restService.getData(getData)
      .subscribe((data: any) => {
        this.conIds = data;
        this.conIds.forEach(element => {
          element['displayName'] = element.consumerId + ": " + element.type.toUpperCase();
        });
        this.populateData('consumerId', data);
      });
  }

  selectCust(): void {
    this.getConIds(this.createBillForm.value.userId.userId);
  }
  dueDateSelected(): void {
    let tempDate = new Date(this.createBillForm.value.dueDate)
    tempDate.setHours(23);
    tempDate.setMinutes(59);
    tempDate.setSeconds(59);
    this.createBillForm.value.dueDate = tempDate;
  }
}
