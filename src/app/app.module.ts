import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreService} from "./shared/book-store.service";
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BookFormComponent } from './book-form/book-form.component';
import { LoginComponent } from './admin/login/login.component';
import {AuthService} from "./shared/authentication-service";
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { OrderOverviewItemComponent } from './order-overview-item/order-overview-item.component';
import { OrderlogItemComponent } from './orderlog-item/orderlog-item.component';
import { OrderlogListComponent } from './orderlog-list/orderlog-list.component';
import { OrderlogFormComponent } from './orderlog-form/orderlog-form.component';
import { OverviewComponent } from './admin/overview/overview.component';
import { AddressComponent } from './admin/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookFormComponent,
    LoginComponent,
    OrderListComponent,
    OrderListItemComponent,
    OrderOverviewComponent,
    OrderOverviewItemComponent,
    OrderlogItemComponent,
    OrderlogListComponent,
    OrderlogFormComponent,
    OverviewComponent,
    AddressComponent,
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [
      BookStoreService, AuthService, {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
