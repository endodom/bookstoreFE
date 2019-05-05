import { Component, OnInit } from '@angular/core';
import {BookStoreService} from "../../shared/book-store.service";
import {AuthService} from "../../shared/authentication-service";
import {FormBuilder, FormGroup, NgModel} from "@angular/forms";
import {AddressFactory} from "../../shared/address-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../shared/address";
import {isNullOrUndefined} from "util";
import {isEmpty, retry} from "rxjs/internal/operators";

@Component({
  selector: 'bs-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
    addressForm: FormGroup;
    address = AddressFactory.empty();
    addresses : Address[];
    param;
    idOnIndex;

    countries = [
        {'id':'DE', 'name':'Deutschland'},
        {'id':'CH', 'name': 'Schweiz'},
        {'id':'AT', 'name': 'Österreich'}
    ];

  constructor(private fb: FormBuilder, private bs: BookStoreService,
              private route: ActivatedRoute, private router: Router,private authService: AuthService) { }

  ngOnInit() {
      this.param = this.route.snapshot.params;


      if(this.isOverview(this.param.id)){
          this.bs.getAllAddresses(this.authService.getCurrentUserId()).subscribe(res => {
              this.addresses = res;
              this.initEmptyForm();
          });
          this.initEmptyForm();
      }
      if(!this.isOverview(this.param.id)){
          this.bs.getAllAddresses(this.authService.getCurrentUserId()).subscribe(res => {
              this.addresses = res;
              this.idOnIndex = this.addresses.findIndex(i => i.id === parseInt(this.route.snapshot.params.id));
              this.initForm();
          });
      }


  }

  isOverview(id:number){
      if(isNullOrUndefined(id)) {
          return true;
      }
  }

    initEmptyForm() {
        this.addressForm = this.fb.group({
            street: "",
            city: "",
            postcode: "",
            country: "",
            isMain: false
        });
    }
    initForm() {
      let country;

          if (this.addresses[this.idOnIndex].country == "Schweiz"){
              country = "CH"
          }
        if (this.addresses[this.idOnIndex].country == "Österreich"){
            country = "AT"
        }
        if (this.addresses[this.idOnIndex].country == "Deutschland"){
            country = "DE"
        }
        console.log(this.addresses[this.idOnIndex].isMain);



        this.addressForm = this.fb.group({
            street: this.addresses[this.idOnIndex].street,
            city: this.addresses[this.idOnIndex].city,
            postcode: this.addresses[this.idOnIndex].postcode,
            country: country,
            isMain: this.addresses[this.idOnIndex].isMain
        });
    }


    submitForm() {

        let address: Address = AddressFactory.fromObject(this.addressForm.value);
        address.user_id = this.authService.getCurrentUserId();

        if (this.isOverview(this.route.snapshot.params.id)){
            this.bs.createAddress(address).subscribe(res => {
                this.router.navigate(['../'], {relativeTo: this.route});
            });
        }
        if(!this.isOverview(this.route.snapshot.params.id)){
            address.id = this.route.snapshot.params.id;
            this.bs.updateAddress(address).subscribe(res => {
                this.router.navigate(['../'], {relativeTo: this.route});
            });
        }

        console.log(address);



    }

    /*updateErrorMessages() {
        this.errors = {};
        for (const message of BookFormErrorMessages) {
            const control = this.bookForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] &&
                !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }*/

}
