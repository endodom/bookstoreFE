import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import {Author, Book, Image} from "./book";
import {Order} from "./order";
import {OrderListComponent} from "../order-list/order-list.component";
import {Orderlog} from "./orderlog";
import {Address} from "./address";
import {AppComponent} from "../app.component";

@Injectable()
export class BookStoreService {

  private api = 'http://bookstore19.s1610456009.student.kwmhgb.at/api';
  private BookInCart;
  private cart = [];
  public label : boolean;
  orders : Order[];

  constructor(private http: HttpClient) {}

  addToCart (isbn:string, count:number){

      //finds Index of isbn if exists
      let isbnOnIndex = this.cart.findIndex(i => i.isbn === isbn);

      if(this.cart.length == 0 || isbnOnIndex == -1){
          this.BookInCart = {isbn: isbn, count: count};
          this.cart.push(this.BookInCart);
      }
      //raises only the count of the book by the count if the isbn exists
      else{
          this.cart[isbnOnIndex].count += count;
      }

      localStorage.setItem('cart', JSON.stringify(this.cart));

  }

    createOrder(order: Order) : Observable<any>{
        return this.http.post(`${this.api}/order`, order)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }
    updateOrder(orderlog: Orderlog) : Observable<Array<Orderlog>>{
        return this.http.put(`${this.api}/update/${orderlog.order_id}`, orderlog)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    sortDesc() : Observable<Array<Order>>{
        return this.http.get(`${this.api}/orders/sortDesc`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    sortAsc() : Observable<Array<Order>>{
        return this.http.get(`${this.api}/orders/sortAsc`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    sortByStatus(status:number) : Observable<Array<Order>>{
        return this.http.get(`${this.api}/orders/by/${status}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrderlogs(id:number) : Observable<Array<Orderlog>>{
        return this.http.get(`${this.api}/orders/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getAllOrders() : Observable<Array<Order>>{
        return this.http.get(`${this.api}/orders`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getOrdersWithUserId(id:number) : Observable<Array<Order>>{
        return this.http.get(`${this.api}/orders/findbyuser/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    removeBookFromCart(isbn : string){
        let cart = JSON.parse(localStorage.getItem("cart"));

        for (let i = 0; i < cart.length; i++) {
            console.log();
            if (cart[i].isbn == isbn) {
                cart.splice(Number(i), 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    editCart(isbn:string, count:number){
        let cart = JSON.parse(localStorage.getItem("cart"));

        //finds Index of isbn if exists
        console.log(isbn);
        console.log(count);
        let isbnOnIndex = cart.findIndex(i => i.isbn === isbn);
        console.log(isbnOnIndex);
        console.log(cart);

        //raises only the count of the book by the count if the isbn exists
        cart[isbnOnIndex].count = count;

        localStorage.setItem('cart', JSON.stringify(cart));

        //this.orderlist.render();

    }

    translateStatus(status){
        if(status === 0){
            return status = "Bestellung eingegangen";
        }
        if(status === 1){
            return status = "in Bearbeitung";
        }
        if(status === 2){
            return status = "Versandt";
        }
        if(status === 3){
            return status = "Zugestellt";
        }
        if(status === 4){
            return status = "Zurückgesandt";
        }
        if(status === -1){
            return status = "Stoniert";
        }
    }

    getImage(status:string){

        if(status == "Bestellung eingegangen"){
            return "assets/images/delivery-0.png";
        }
        if(status == "in Bearbeitung"){
            return "assets/images/delivery-1.png";
        }
        if(status == "Versandt"){
            return "assets/images/delivery-2.png";
        }
        if(status == "Zugestellt"){
            return "assets/images/delivery-3.png";
        }
        if(status == "Zurückgesandt"){
            return "assets/images/delivery-4.png";
        }
        if(status == "Stoniert"){
            return "assets/images/delivery-failed.png";
        }

    }

    setLabel(){
        return this.label = true;
    }

    unsetLabel(){
        return this.label = false;
    }

    createAddress(address: Address) : Observable<Address>{
        return this.http.post(`${this.api}/admin/address`, address)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    updateAddress(address: Address) : Observable<Address>{
        return this.http.put(`${this.api}/admin/address/update/${address.id}`, address)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }
    removeAddress(id: number) : Observable<any> {
        return this.http.delete(`${this.api}/admin/address/update/${id}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    getAllAddresses(userId:number) : Observable<Array<Address>>{
        return this.http.get(`${this.api}/admin/address/${userId}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }
    getMainAddress(userId:number) : Observable<Array<Address>>{
        return this.http.get(`${this.api}/admin/mainaddress/${userId}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

  /*
  * Book Functions
  */
  getAll() : Observable<Array<Book>> {
      return this.http.get(`${this.api}/books`)
          .pipe(retry(3))
          .pipe(catchError(this.errorHandler));

  }

  getSingle(isbn : string) : Observable<Book> {
      return this.http.get(`${this.api}/book/${isbn}`)
          .pipe(retry(3))
          .pipe(catchError(this.errorHandler));
  }

  getStatusOfOrder(id:number): Observable<Order>{
      return this.http.get(`${this.api}/order/getStatus/${id}`)
          .pipe(retry(3))
          .pipe(catchError(this.errorHandler));

  }

  create(book: Book) : Observable<any> {
      return this.http.post(`${this.api}/book`, book)
          .pipe(retry(3))
          .pipe(catchError(this.errorHandler));
  }

    update(book: Book) : Observable<any> {
        return this.http.put(`${this.api}/book/${book.isbn}`, book)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

    remove(isbn: string) : Observable<any> {
        return this.http.delete(`${this.api}/book/${isbn}`)
            .pipe(retry(3))
            .pipe(catchError(this.errorHandler));
    }

  private errorHandler ( error:Error | any) : Observable<any> {
      return throwError(error);
  }
}
