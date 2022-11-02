import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.scss']
})
export class SellerRegisterComponent implements OnInit {
  seller: Seller = {} as Seller
  constructor(private fb: FormBuilder, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
  }
    sellerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repassword: ['', [Validators.required, Validators.minLength(8)]],
    fullname: ['', [Validators.required, Validators.minLength(10)]],
  })

  get email() {
    return this.sellerForm.get('email');
  }
  get username() {
    return this.sellerForm.get('username')
  }
  get fullname() {
    return this.sellerForm.get('fullname');
  }
  get password() {
    return this.sellerForm.get('password')
  }
  get repassword() {
    return this.sellerForm.get('repassword')
  }

  Submit() {
    let { fullname, password, username, email, repassword } = this.sellerForm.value
    this.seller.FullName = fullname || ""
    this.seller.password = password || ""
    this.seller.UserName = username || ""
    this.seller.Email = email || ""
    if (repassword === password) {
      this.api.RegisterSeller(this.seller).subscribe({
        next: (user) => {
          this.router.navigate(['sellerlogin'])
        },
        error: (err) => {
        }
      })
    }
  }

  matched(): boolean {
    let { password, repassword } = this.sellerForm.value
    return password === repassword ? true : false
  }
  GoLogin(){
    this.router.navigate(['sellerlogin'])
  }
}
