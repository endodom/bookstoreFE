import {Component, Input, OnInit} from '@angular/core';
import {Address} from "../../shared/address";
import {BookStoreService} from "../../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/authentication-service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'a.bs-address',
  templateUrl: './address.component.html',
  styles: []
})
export class AddressComponent implements OnInit {
  @Input() address : Address;
        main : boolean;

  constructor(private bs: BookStoreService,
              private route : ActivatedRoute,
              private router : Router,
              private authService : AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
      const user = parseInt(localStorage.getItem('userId'));

  }

    removeAddress(id:number){
      if(confirm("Adresse wirklich löschen?")){
          console.log(id);
          this.bs.removeAddress(this.address.id).subscribe(res => {
              this.router.navigate(['../../'], {relativeTo: this.route})
              //window.location.reload();
          });

      }
    }
    isItMain(){
        return this.address.isMain
    }
    isItActive(){
        return this.address.id == this.route.snapshot.params.id

    }

}
