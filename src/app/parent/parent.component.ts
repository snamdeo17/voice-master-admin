import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  message: string = "Message from Parent";
  receivedMsg: string;
  constructor() { }

  ngOnInit() {
  }
  listenMessage($event) {
    this.receivedMsg = $event;
  }
}
