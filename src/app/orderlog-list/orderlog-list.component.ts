import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../shared/order";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication-service";
import {Orderlog} from "../shared/orderlog";

@Component({
  selector: 'bs-orderlog-list',
  templateUrl: './orderlog-list.component.html',
  styles: []
})
export class OrderlogListComponent implements OnInit {
    @Input() order: Order;
             orderlogs : Orderlog[];

  constructor(private bs: BookStoreService,
              private router: Router,
              private route : ActivatedRoute,
              private authService : AuthService)
  { }

  ngOnInit() {
      //Route zerlegen
      const params = this.route.snapshot.params;
      this.bs.getOrderlogs(params['id']).subscribe(
          res => {
              this.orderlogs = res;
              for (let i = 0; i < res.length; i++) {
                  this.orderlogs[i].status = this.bs.translateStatus(res[i].status);
              }

          }


      );

  }


}
