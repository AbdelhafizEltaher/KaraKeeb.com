import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  subject = new BehaviorSubject(0);

  constructor( private api: ApiService) { }

  get():number{
    let num = 0
    this.subject.subscribe({
      next: (v) => 
      {
         num = v       
      }
    });
    return num
  }

  set(num:number){
    this.subject.next(num)
  }


}
