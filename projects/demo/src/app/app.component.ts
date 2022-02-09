import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  accordion: boolean = true;
  disableSecondGroup: boolean = false;

  ngOnInit(): void {
 }



}
