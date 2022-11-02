import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  user: User = {} as User
  ProductsArray: Product[] = []
  product: Product = {} as Product
  waiting=true
  constructor(private api: ApiService , private router: Router) { }

  ngOnInit(): void {
    let id = localStorage.getItem('id') || ""
    this.api.GetUserByID(id).subscribe((data) => {
      this.user = data
      for (const iterator of this.user.Products || []) {
        this.api.GetProductByID(iterator).subscribe((data) => {
          this.product = data
          this.ProductsArray.push(this.product)
        })


      }
    })
    this.Setwaiting()
  }

  BuyOrRemove(item: Product | any) {

this.router.navigate(['order',item._id])
  }
  Setwaiting(){
    setTimeout(()=>{
      this.waiting=false
    },1000)
  }
}

