import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Book, Image, Author } from '../shared/book';
import { BookStoreService} from "../shared/book-store.service";
import {Address} from "../shared/address";
import {AuthService} from "../shared/authentication-service";
import {isNullOrUndefined} from "util";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {

    books : Book[];
    address : Address;

    constructor (private bs : BookStoreService) {}

    ngOnInit() {
        if(!isNullOrUndefined(localStorage.getItem('userId'))){
            const userId = parseInt(localStorage.getItem('userId'));

            this.bs.getMainAddress(userId).subscribe(res => {
                this.address = res[0];
            });

            this.bs.getAll().subscribe(res => {
                this.books = res;
                let percentage = Number(this.address.taxPercentage);
                let netPrice = Number(0);
                let priceVal = Number(0);
                let sum = Number(0);
                for(let i = 0; i < this.books.length; i++){
                    netPrice = Number(this.books[i].price);
                    priceVal = netPrice * percentage;
                    sum = priceVal + netPrice;
                    sum = Number(sum.toFixed(2));
                    this.books[i].price = sum;
                }
            });

        }
        else {
            this.bs.getAll().subscribe(res => {
                this.books = res;
                let percentage = Number(0.10);
                let netPrice = Number(0);
                let priceVal = Number(0);
                let sum = Number(0);
                for(let i = 0; i < this.books.length; i++){
                    netPrice = Number(this.books[i].price);
                    priceVal = netPrice * percentage;
                    sum = priceVal + netPrice;
                    sum = Number(sum.toFixed(2));
                    this.books[i].price = sum;
                }
            });
        }


    }


}
