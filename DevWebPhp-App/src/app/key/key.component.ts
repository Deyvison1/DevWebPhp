import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {

  titulo = 'Chave';
  constructor() { }

  ngOnInit() {
  }

  key(template: any) {
    template.show();
  }


}
