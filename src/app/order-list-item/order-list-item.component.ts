import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../shared/order";
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";

@Component({
  selector: 'a.bs-order-list-item',
  templateUrl: './order-list-item.component.html',
  styles: []
})
export class OrderListItemComponent implements OnInit {
  @Input() book: Book;


  constructor(private bs: BookStoreService) {
  }

  ngOnInit() {


  }

    removeBookFromCart(isbn:string){
      this.bs.removeBookFromCart(isbn);
        window.location.reload();
    }

    editAmount(){
        let amount = parseInt((<HTMLInputElement>document.getElementById('amount_'+this.book.id)).value);
        this.bs.editCart(this.book.isbn, amount);
        window.location.reload();
    }
}
