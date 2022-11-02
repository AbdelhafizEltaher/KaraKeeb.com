import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
  }
  user: User = {} as User


  userForm = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repassword: ['', [Validators.required, Validators.minLength(8)]],
    fullname: ['', [Validators.required, Validators.minLength(10)]],
  })

  get email(){
    return this.userForm.get('email');
  }
  get username(){
    return this.userForm.get('username') 
  }
  get fullname(){
    return this.userForm.get('fullname');
  }
  get password(){
    return this.userForm.get('password') 
  }
  get repassword(){
    return this.userForm.get('repassword') 
  }

  ngOnInit(): void {
  }

  Submit() {

    let { fullname, password, username, email, repassword } = this.userForm.value
    this.user.FullName = fullname || ""
    this.user.password = password || ""
    this.user.UserName = username || ""
    this.user.Email = email || ""
    if (repassword === password) {
      this.api.RegisterUser(this.user).subscribe({
        next: (user) => {
          console.log(user);
          this.router.navigate(['userlogin'])
        },
        error: (err) => {
          console.log(err.error);
        }
      })
    }    
  }
  matched():boolean{
    let {password,repassword} = this.userForm.value
    return password === repassword? true : false
  }
  GoLogin(){
    this.router.navigate(['userlogin'])
  }
}
