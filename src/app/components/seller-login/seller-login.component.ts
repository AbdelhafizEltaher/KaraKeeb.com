import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.scss']
})
export class SellerLoginComponent implements OnInit {

  seller:Seller={} as Seller
  constructor(private fb: FormBuilder, private router: Router, private api: ApiService, private Auth: AuthService) { }
  loginForm = this.fb.group({
    username: (['', [Validators.required]]),
    password: (['', [Validators.required]])
  })
  ngOnInit(): void {
  }
  get username() {
    return this.loginForm.get('username')
  }
  get password() {
    return this.loginForm.get('password')
  }
  Submit() {
    var { username, password } = this.loginForm.value

    let LoginObj = {
      "UserName": username,
      "password": password
    }
    this.api.LoginSeller(LoginObj).subscribe({
      next: (data) => {
        this.seller = data
        this.seller.AccessToken = data.AccessToken || ""
        this.Auth.login(this.seller.AccessToken)
        localStorage.setItem("FullName",this.seller.FullName)
        localStorage.setItem("email",this.seller.Email)
        localStorage.setItem("id",`${this.seller._id}`)
        localStorage.setItem("role",'seller')
        this.router.navigate(['sellerprofile'])
      },
      error: (err) => {
        alert(err.error)
      }
    })

  }

  GoRegister() {
    this.router.navigate(['sellerregister'])
  }
}