import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { BookDetailsComponent } from './book-details/book-details.component';
import { BookListComponent } from './book-list/book-list.component';
import { HomeComponent } from './home/home.component';
import { BookFormComponent } from "./book-form/book-form.component";
import { LoginComponent } from "./admin/login/login.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderOverviewComponent} from "./order-overview/order-overview.component";
import {OrderlogItemComponent} from "./orderlog-item/orderlog-item.component";
import {OrderlogListComponent} from "./orderlog-list/orderlog-list.component";
import {OrderlogFormComponent} from "./orderlog-form/orderlog-form.component";
import {OverviewComponent} from "./admin/overview/overview.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BookListComponent },
    { path: 'cart', component: OrderListComponent },
    { path: 'orders', component: OrderOverviewComponent },
    { path: 'books/:isbn', component: BookDetailsComponent },
    { path: 'orders/:id', component: OrderlogListComponent },
    { path: 'update/:id', component: OrderlogFormComponent },
    { path: 'admin/bookForm', component: BookFormComponent },
    { path: 'admin/bookForm/:isbn', component: BookFormComponent },
    { path: 'admin/address', component: OverviewComponent },
    { path: 'admin/address/update/:id', component: OverviewComponent },
    { path: 'login', component: LoginComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }