import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";
import { BookStoreService} from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";

import {Order} from "../shared/order";
import {of} from "rxjs";
import {forEach} from "@angular/router/src/utils/collection";
import {OrderListItemComponent} from "../order-list-item/order-list-item.component";
import {OrderFactory} from "../shared/order-factory.service";
import {isNullOrUndefined} from "util";
import {Address} from "../shared/address";
import {takeLast} from "rxjs/internal/operators";


@Component({
  selector: 'bs-order-list',
  templateUrl: './order-list.component.html',
  styles: []
})
export class OrderListComponent implements OnInit {

  private booksForOrder = [];
  private order : Order;
  private address : Address;



  constructor(private bs: BookStoreService, private route: ActivatedRoute, private router: Router, private authService : AuthService,) {
    this.order = OrderFactory.empty();
  }

  ngOnInit() {
      this.bs.unsetLabel();

      if(!isNullOrUndefined(localStorage.getItem('userId'))){
          this.bs.getMainAddress(this.authService.getCurrentUser()).subscribe(res => {
              this.address = res[0];
              this.address.taxPercentage = Number(this.address.taxPercentage);
              this.getBook();

          });
      }
      else {
          const cart = JSON.parse(localStorage.getItem('cart'));

          this.booksForOrder["sum"] = 0;
          if (!isNullOrUndefined(cart.length)){
              for (let i = 0; i < cart.length; i++){
                  let isbn = cart[i].isbn;
                  this.bs.getSingle(isbn).subscribe(result => {
                      result.amount = cart[i].count;
                      result.price *= cart[i].count;
                      let percentage = Number(0.10);
                      let netPrice = Number(0);
                      let priceVal = Number(0);
                      let sum = Number(0);
                      netPrice = result.price;
                      priceVal = netPrice * percentage;
                      sum = priceVal + netPrice;
                      sum = Number(sum.toFixed(2));
                      result.price = sum;
                      this.booksForOrder["sum"] += sum;
                      this.booksForOrder.push(result);
                  });
              }
          }
      }


  }
    getBook(){
        const cart = JSON.parse(localStorage.getItem('cart'));

        this.booksForOrder["sum"] = 0;
        if (!isNullOrUndefined(cart.length)){
            for (let i = 0; i < cart.length; i++){
                let isbn = cart[i].isbn;
                this.bs.getSingle(isbn).subscribe(result => {
                    result.amount = cart[i].count;
                    result.price *= cart[i].count;
                    let percentage = Number(this.address.taxPercentage);
                    let netPrice = Number(0);
                    let priceVal = Number(0);
                    let sum = Number(0);
                    netPrice = result.price;
                    priceVal = netPrice * percentage;
                    sum = priceVal + netPrice;
                    sum = Number(sum.toFixed(2));
                    result.price = sum;
                    this.booksForOrder["sum"] += sum;
                    this.booksForOrder.push(result);
                });
            }
        }
    }

    orderIt(){

      this.order.user_id = this.authService.getCurrentUserId();
      this.order.addressId = this.address.id;

      for (let i = 0;i < (this.booksForOrder.length); i++){
        this.order.books.push(this.booksForOrder[i]);
      }

      this.bs.createOrder(this.order).subscribe(res=>{
          localStorage.removeItem('cart');
          this.router.navigate(['../books'], {relativeTo: this.route});
      });

      console.log(this.order);

    }

}
