import { RestService } from './../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers: [DatePipe]
})
export class BillingComponent implements OnInit {

  billingTypes: any = [];
  selectedType: any = '';
  //selectedType = new FormControl('');

  createBillForm = this.fb.group({
    userId: ['', Validators.required],
    consumerId: ['', Validators.required],
    name: ['', Validators.required],
    amount: ['', Validators.required],
    dueDate: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private restService: RestService, private messageService: MessageService) {

    this.billingTypes = [
      { name: 'Electricity', id: 'electricity' },
      { name: 'Water', id: 'water' },
      { name: 'Others', id: 'other' }
    ];

  }

  ngOnInit() {
  }

  onSubmit() {
    //console.warn(this.createBillForm.value);
    // process Value
    // http://localhost:8080/api/bill
    let postData: any = {};
    postData.url = '/api/bill';
    postData.data = this.createBillForm.value;
    postData.data.name = this.createBillForm.value.name.id;
    //postData.data.dueDate = new Date(this.createBillForm.value.dueDate);
    console.log(postData)
    this.restService.postData(postData)
      .subscribe((data: any) => {
        console.log(data)
        this.messageService.add({ key: 'success', severity: 'success', summary: 'Success', detail: 'Via MessageService' });
        this.resetCreateBillForm();
      });
  }
  resetCreateBillForm() {
    this.createBillForm.reset();
  }
}
