import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
user:User={} as User
  constructor(private api : ApiService,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
if(this.auth.isUser()){
  let id =localStorage.getItem('id') || ""
  this.api.GetUserByID(id).subscribe((data)=>{
    this.user=data
  })

}
else{
this.router.navigate(['home'])
}

  }

  LogOut(){
    localStorage.clear()
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }

}
