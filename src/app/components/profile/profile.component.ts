import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardGuard } from 'src/app/services/auth-guard.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit(): void {
    if(this.auth.isLogged()){

      if(this.auth.isUser()){
        this.router.navigate(['userprofile'])
      }
      else if(this.auth.isSeller()){
        this.router.navigate(['sellerprofile'])
      }
    }
 
  }
  User_Register() {
    this.router.navigate(['registeruser'])
  }

  Seller_Register() {
    this.router.navigate(['sellerregister'])
  }


  User_Login() {
    this.router.navigate(['userlogin'])
  }

  Seller_Login() {
    this.router.navigate(['sellerlogin'])
  }
}
