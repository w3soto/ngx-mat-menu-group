import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  accordion: boolean = true;

  expandFirst: boolean = false;

  expandSecond: boolean = false;

  disableInnerItems: boolean = false;

  disableSecondGroup: boolean = false;

  ngOnInit(): void {
 }



}
