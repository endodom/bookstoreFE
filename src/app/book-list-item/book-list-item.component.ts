import { Component, OnInit, Input } from '@angular/core';
import {Book} from '../shared/book';
import {FormBuilder} from "@angular/forms";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/authentication-service";

@Component({
  selector: 'a.bs-book-list-item',
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book;
  taxPercentage : number;
  result :number;

  constructor(private fb: FormBuilder, private bs: BookStoreService,
              private route: ActivatedRoute, private router: Router,private authService: AuthService) { }

  ngOnInit() {



  }

}
