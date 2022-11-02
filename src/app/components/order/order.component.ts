import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  ProductID = ""
  product: Product | any
  ProductArray: Product[] = []
  user: User = {} as User
  ord: Order = {} as Order
  date = new Date()
  willbuy = false
  num = Math.ceil(Math.random() * 90000)
  constructor(private activeRouter: ActivatedRoute, private api: ApiService, private location: Location, private cart: CartService) { }

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
    let id = localStorage.getItem('id') || ""
    this.api.GetUserByID(id).subscribe((data) => {
      this.user = data
      this.ord.Adress = "City:Qena"
      this.ord.Amount = 1
      this.ord.Products = [{ "ProductID": this.product._id, "Quantity": 1 }]
      this.ord.UserId = this.user._id?.toString() || id
    })



  }

  order() {


    alert("You Are Going To Make Order And Buying This Products")
    this.api.MakeOrder(this.ord).subscribe({
      next: (data) => {
        this.ord = data

      },
      error(err) {
        console.log(err);

      }
    })

    this.willbuy = true

  }
  Buy() {

    let id = localStorage.getItem('id') || ""

    this.api.GetUserByID(id).subscribe((data) => {
      this.user = data
      let CartArray = this.user.Products

      CartArray = CartArray?.filter((elem) => {

        return elem != this.product._id
      })

      let num = CartArray?.length || 0
      this.willbuy = false
      this.cart.set(num)

      let UpdatedData = {
        "Products": CartArray
      }
      this.api.AddToCart(UpdatedData, id).subscribe((data) => { })

    })
  }

  hidedialouge() {
    this.willbuy = false
    let _id = this.ord._id || ""
    this.api.deletOrder(_id).subscribe({
      next: (data) => {
        alert("Order Has Been Canceld Succssefully")
      }
      ,
      error: (err) => {
        console.log(err);

      }
    })


  }

  cancel() {
    this.location.back()
  }

}
