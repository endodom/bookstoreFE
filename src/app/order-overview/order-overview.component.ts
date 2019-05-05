import { Component, OnInit } from '@angular/core';
import { OrderFactory} from "../shared/order-factory.service";
import {Order} from "../shared/order";
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {BookFactory} from "../shared/book-factory";
import {Router, ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {AuthService} from "../shared/authentication-service";

@Component({
    selector: 'bs-order-overview',
    templateUrl: './order-overview.component.html',
    styles: []
})
export class OrderOverviewComponent implements OnInit {

    orders : Order[];
    user : number;


    //dependency injection
    constructor (private bs : BookStoreService, private authService : AuthService){}

    ngOnInit() {
        //for FrontendUser

            if (this.authService.isBackendUser()) {
                this.bs.getAllOrders().subscribe(
                    res => {
                        this.orders = res;
                        for (let i = 0; i < res.length; i++) {
                            this.orders[i].status = this.bs.translateStatus(res[i].status);
                        }
                    });
            }
            else {
                this.bs.getOrdersWithUserId(this.authService.getCurrentUserId()).subscribe(
                    res => {
                        this.orders = res;
                        for (let i = 0; i < res.length; i++) {
                            this.orders[i].status = this.bs.translateStatus(res[i].status);
                        }
                    });
            }


    }

    sortDesc() {
        this.bs.sortDesc().subscribe(
            res => {
                this.orders = res;
                for (let i = 0; i < res.length; i++) {
                    this.orders[i].status = this.bs.translateStatus(res[i].status);
                }
            });
    }
    sortAsc() {
        this.bs.sortAsc().subscribe(
            res => {
                this.orders = res;
                console.log(this.orders);
                for (let i = 0; i < res.length; i++) {
                    this.orders[i].status = this.bs.translateStatus(res[i].status);
                }
            });
    }

    sortByStatus(status:number){
        this.bs.sortByStatus(status).subscribe(
            res => {
                this.orders = res;
                for (let i = 0; i < res.length; i++) {
                    this.orders[i].status = this.bs.translateStatus(res[i].status);
                }
            });
    }

    getOrderByUserId(){
        let userID = parseInt((<HTMLInputElement>document.getElementById('userID')).value);
        console.log(userID);
        if(userID){
            this.bs.getOrdersWithUserId(userID).subscribe( res => {
                this.orders = res;
                for (let i = 0; i < res.length; i++) {
                    this.orders[i].status = this.bs.translateStatus(res[i].status);
                }
            });
        }
    }


}
