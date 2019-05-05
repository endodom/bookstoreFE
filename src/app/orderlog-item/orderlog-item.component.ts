import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../shared/order";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication-service";
import {Orderlog} from "../shared/orderlog";

@Component({
  selector: 'div.bs-orderlog-item',
  templateUrl: './orderlog-item.component.html',
  styles: []
})
export class OrderlogItemComponent implements OnInit {
  @Input() orderlog : Orderlog;


  constructor(private bs: BookStoreService,
              private router: Router,
              private route : ActivatedRoute,
              private authService : AuthService
  ) { }

  ngOnInit() {

  }


}
