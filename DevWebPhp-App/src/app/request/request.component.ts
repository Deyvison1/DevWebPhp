import { Component, OnInit } from '@angular/core';
import { RequestService } from '../_services/request.service';
import { Request } from '../_models/Request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  /* Request */
  request: Request = new Request();
  requests: Request[];

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.getRequest();
  }

  getRequest() {
    return this.requestService.getAllRequest().subscribe(
      (_request: Request[]) => {
        this.requests = _request;
        console.log(_request);
      }, error => {
        console.log(error);
      }
    );
  }
}
