import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private api: ApiService, private Auth: AuthService) { }
  seller:Seller={} as Seller


  ngAfterViewInit(): void {
    
  }


  ngOnInit(): void {

    if(this.Auth.isSeller()){
      let id =localStorage.getItem('id') || ""
        this.api.GetSellerByID(id).subscribe({
          next: (data) => {
            this.seller = data
          },
          error: (err) => {
           console.log(err.error);
           
          }
        })
    }
    else{
      this.router.navigate(['home']).then(() => {
        window.location.reload();
      });
    }



  }

  LogOut(){
    localStorage.clear()
    this.router.navigate(['home'])
  }
}
