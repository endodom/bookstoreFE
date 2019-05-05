import {Component, Input} from '@angular/core';
import { Book } from './shared/book';
import {AuthService} from "./shared/authentication-service";
import {BookStoreService} from "./shared/book-store.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {

  user;

  constructor (private authService : AuthService, private bs: BookStoreService) {

  }

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    }
    return "Login";
  }

}
