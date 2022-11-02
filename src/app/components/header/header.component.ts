import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  AvailableToSeller = false
  availabletouser=false
  items=0
  user:User ={} as User
  seller :Seller ={} as Seller
  constructor(private Auth: AuthService, private api:ApiService , private router:Router , private cart : CartService) {

   }

  ngOnInit(): void {
    
    if (this.Auth.isSeller()) {
      this.AvailableToSeller = true
    }
    else{
      this.AvailableToSeller = false
    }

    if(this.Auth.isUser()){
      this.availabletouser=true

    }


    if(this.Auth.isUser())
    {
      let id = localStorage.getItem('id')||""
      this.api.GetUserByID(id).subscribe({
        next: (data) => {        
        this.user=data
        let num = this.user.Products?.length || 0
        this.cart.set(num)
        this.Auth.set(this.user.FullName.split(' ')[0])
        },
        error: (err) => {
          if(err.error == "Sorry ! Token Is InValied Or Expired"){
            alert("! Sorry You Have To Login Again ")
            localStorage.clear()
            this.router.navigate(['singup'])
          }
          else{
            console.log(err);
          }
        }
        })
    }
    else if(this.Auth.isSeller())
      {
        let id = localStorage.getItem('id')||""
        this.api.GetSellerByID(id).subscribe({
          next: (data) => {        
            this.seller=data
            this.Auth.set(this.seller.FullName.split(' ')[0])

            },
            error: (err) => {
              if(err.error == "Sorry ! Token Is InValied Or Expired"){
                alert("! Sorry You Have To Login Again ")
                localStorage.clear()
                this.router.navigate(['singup'])
              }
              else{
                console.log(err);
              }             
            }
          })
    }


  }

  calcCartItems(){
    return this.cart.get()
  }
  SetProfileName(){
    return this.Auth.get()
  }

}


