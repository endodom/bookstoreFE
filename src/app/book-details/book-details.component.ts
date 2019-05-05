import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { Book } from '../shared/book';
import {ActivatedRoute, Router} from "@angular/router";
import { BookStoreService } from "../shared/book-store.service";
import {AuthService} from "../shared/authentication-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {count} from "rxjs/internal/operators";
import {Address} from "../shared/address";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {

  @Input() book : Book;
  address : Address;

  constructor(
      private bs: BookStoreService,
      private route : ActivatedRoute,
      private router : Router,
      private authService : AuthService,
      private fb: FormBuilder
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.params;


    if (!isNullOrUndefined(localStorage.getItem('userId'))){
        const userId = parseInt(localStorage.getItem('userId'));

        this.bs.getMainAddress(userId).subscribe(res => {
            this.address = res [0];
        });

        this.bs.getSingle(params['isbn']).subscribe(res => {
            this.book = res;
            let percentage = Number(this.address.taxPercentage);
            let netPrice = Number(0);
            let priceVal = Number(0);
            let sum = Number(0);
            netPrice = Number(this.book.price);
            priceVal = netPrice * percentage;
            sum = priceVal + netPrice;
            sum = Number(sum.toFixed(2));
            this.book.price = sum;

        });
    }
    else {
        this.bs.getSingle(params['isbn']).subscribe(res => {
            this.book = res;
            let percentage = Number(0.10);
            let netPrice = Number(0);
            let priceVal = Number(0);
            let sum = Number(0);
            netPrice = Number(this.book.price);
            priceVal = netPrice * percentage;
            sum = priceVal + netPrice;
            sum = Number(sum.toFixed(2));
            this.book.price = sum;

        });
    }


  }

  removeBook(){
    if(confirm("Buch wirklich löschen?")){
      this.bs.remove(this.book.isbn)
          .subscribe(res => this.router.navigate(['../'],
              {relativeTo: this.route}
          ));
    }
  }
  addToCart(){
    let amount = parseInt((<HTMLInputElement>document.getElementById('count')).value);
    console.log(amount);
    this.bs.addToCart(this.book.isbn, amount);
    this.bs.setLabel();
  }


  getRating (num: number) {
    return new Array(num);
  }


}
