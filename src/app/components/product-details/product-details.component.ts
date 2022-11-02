import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  ProductID = ""
  product: Product | any
  productArray: Product[] = []
  IndexArr: any = []
  CurrentIndex: number = 0
  isEmpty: boolean = false
  user: User = {} as User
isuser=false
  constructor(private activeRouter: ActivatedRoute,
    private api: ApiService, private location: Location,
    private router: Router, private auth: AuthService,
    private cart: CartService) {
  }

  ngOnInit(): void {
    
    this.ProductID = (this.activeRouter.snapshot.paramMap.get('id')) || ""
    if (this.ProductID) {
      this.api.GetProductByID(this.ProductID).subscribe((data) => {
        this.product = data
      })
    } else {
      alert("Product Not Found")
      this.location.back()
    }
    if (this.auth.isSeller()) {
      let id = localStorage.getItem('id') || ""
      this.api.GetSellerByID(id).subscribe((data) => {
        this.api.GetProductBySellerName(data.FullName).subscribe({
          next: (data) => {
            this.productArray = data
          }
          ,
          error: (err) => {
            console.log(err.error);

          }
        })

      })
    }
    else {
      if(this.auth.isUser()){
        this.isuser=true
      }
      this.api.GetAllProducts().subscribe
        ((data) => {
          this.productArray = data
        })
    }

  }

  goback() {
    this.location.back();
  }

  Gonext() {
    this.IndexArr = this.ProductArrayIndexs()
    this.CurrentIndex = this.ProductIndex(this.product._id)


    if (this.CurrentIndex == this.IndexArr.length - 1) {
      this.isEmpty = true
      this.CurrentIndex = 0
      this.api.GetProductByID(this.IndexArr[this.CurrentIndex++].toString()).subscribe((data) => {
        this.product = data
      })
    }
    else {
      this.api.GetProductByID(this.IndexArr[++this.CurrentIndex].toString()).subscribe((data) => {
        this.product = data
      })
    }

  }
  Goprev() {
    this.IndexArr = this.ProductArrayIndexs()
    this.CurrentIndex = this.ProductIndex(this.product._id)
    if (this.CurrentIndex == 0) {
      this.isEmpty = true
      this.CurrentIndex = this.IndexArr.length - 1
      this.api.GetProductByID(this.IndexArr[this.CurrentIndex--].toString()).subscribe((data) => {
        this.product = data
      })
    }
    else {
      this.api.GetProductByID(this.IndexArr[--this.CurrentIndex].toString()).subscribe((data) => {
        this.product = data
      })
    }
  }
  ProductArrayIndexs() {
    return this.productArray.map((elem) => {
      return elem._id
    })
  }
  ProductIndex(_id: string) {

    return this.productArray.findIndex((elem) => {
      return elem._id === _id
    })
  }

  AddToCard() {
    if(this.auth.isUser()){
      let id = localStorage.getItem('id') || ""
      this.api.GetUserByID(id).subscribe((data) => {
        this.user = data
        let CartArray = this.user.Products
        if(CartArray?.includes(this.product._id)){
          alert("This Product Already In Your Cart")
        }
        else{
          CartArray?.push(this.product._id)
          let UpdatedData = {
            "Products": CartArray
          }
          let num = CartArray?.length || 0
          this.cart.set(num)
          this.api.AddToCart(UpdatedData, id).subscribe((data) => { })          
        }

      })
    }
    else{
      alert("please Login First")
    }


  }
}



