import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  @Input() childMessage!: String;
  
  pop: string ="pop";

  ngOnInit(): void {
  }

  message = 'Hola Mundo!';


}
