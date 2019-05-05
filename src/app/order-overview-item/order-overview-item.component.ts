import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../shared/order";
import {BookStoreService} from "../shared/book-store.service";
import {Book} from "../shared/book";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication-service";

@Component({
  selector: 'a.bs-order-overview-item',
  templateUrl: './order-overview-item.component.html',
  styles: []
})
export class OrderOverviewItemComponent implements OnInit {
  @Input() order : Order;
  @Input() book : Book;
  private date;
    private booksInShoppingCart = [];
    private orderStatus = [
        "Bestellung eingegangen",
        "in Bearbeitung",
        "Versandt",
        "Zugestellt",
        "Zurückgesandt",
        "Stoniert"
    ];

  constructor(private bs: BookStoreService,
              private router: Router,
              private route : ActivatedRoute,
              private authService : AuthService) { }

  ngOnInit() {
    let temp = JSON.stringify(this.order.created_at);
    this.date = temp.slice(1,11);
      console.log(this.order.status);
      //console.log(parseInt(this.order.status));

  }

  stepOne(){
    if(this.order.status == "Bestellung eingegangen"){
      return true
    }
      return false;
  }
  stepTwo(){
    if(this.order.status == "in Bearbeitung"){
        return true
    }
      return false;
  }
  stepThree(){
    if(this.order.status == "Versandt"){
        return true
    }
      return false;
  }
  stepFour(){
    if(this.order.status == "Zugestellt"){
        return true
    }
      return false;
  }
  cancelledOrder(){
    if(this.order.status == "Zurückgesandt"){
          return true
    }
    return false;
  }

  returnedOrder(){
    if(this.order.status == "Stoniert"){
        return true
    }
    return false;
  }

}
