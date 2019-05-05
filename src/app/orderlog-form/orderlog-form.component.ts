import { Component, OnInit } from '@angular/core';
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OrderlogFactoryService} from "../shared/orderlog-factory.service";
import {Orderlog} from "../shared/orderlog";
import {Order} from "../shared/order";

@Component({
  selector: 'bs-orderlog-form',
  templateUrl: './orderlog-form.component.html',
  styles: []
})
export class OrderlogFormComponent implements OnInit {
    orderlogForm: FormGroup;
    orderlog = OrderlogFactoryService.empty();
    order : Order;
    link;
    statusForm = [{'id':0, 'name':'Eingegangen'},
        {'id':1, 'name': 'in Bearbeitung'},
        {'id':2, 'name': 'Versandt'},
        {'id':3, 'name': 'Zugestellt'},
        {'id':4, 'name': 'Zurückgesandt'},
        {'id':-1, 'name': 'Stoniert'},
    ];

  constructor(private bs: BookStoreService,
              private router: Router,
              private route : ActivatedRoute,
              private authService : AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.link = this.route.snapshot.params['id'];
    console.log(this.link);

    this.bs.getStatusOfOrder(this.link).subscribe(res => {
      this.orderlog.status = res[0].status;
      this.initOrder();
    });
      this.initOrder();

  }

    initOrder() {
        this.orderlogForm = this.fb.group({
            status: "",
            note: "",
            adminNote: "",
        });
    }
    submitForm() {

        const orderlog: Orderlog = OrderlogFactoryService.fromObject(this.orderlogForm.value);
        orderlog.order_id = this.link;

        console.log(orderlog);

        this.bs.updateOrder(orderlog).subscribe(res => {
          this.router.navigate(['../../orders'], {relativeTo: this.route});
        });

    }


}
