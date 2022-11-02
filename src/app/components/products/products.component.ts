import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {

  user: User = {} as User
  seller: Seller = {} as Seller
  ProductArray: Product[] = []
  waiting=true
  constructor(private api: ApiService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.isSeller()) {
      let id = localStorage.getItem('id') || ""
      this.api.GetSellerByID(id).subscribe((data) => {
        this.api.GetProductBySellerName(data.FullName).subscribe({
          next: (data) => {
            this.ProductArray = data
          }
          ,
          error: (err) => {
            console.log(err.error);

          }
        })

      })
    }
    else {
      this.api.GetAllProducts().subscribe((data) => {
        this.ProductArray = data
      })
    }

this.Setwaiting()

  }
  GoToProductDetails(product: Product) {
    this.router.navigate(['productdetails', product._id])
  }

  Setwaiting(){
    setTimeout(()=>{
      this.waiting=false
    },1000)
  }

}
