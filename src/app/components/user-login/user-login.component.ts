import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  user: User = {} as User
  ReadyToLogin = false
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
    this.api.LoginUser(LoginObj).subscribe({
      next: (data) => {
        this.user = data
        this.user.AccessToken = data.AccessToken || ""
        this.Auth.login(this.user.AccessToken)
        localStorage.setItem("FullName",this.user.FullName)
        localStorage.setItem("email",this.user.Email)
        localStorage.setItem("id",`${this.user._id}`)
        localStorage.setItem("role",'user')
        this.router.navigate(['userprofile'])
this.Auth.set(this.user.FullName.split(' ')[0])

      },
      error: (err) => {
        alert(err.error)
      }
    })
  }

  GoRegister() {
    this.router.navigate(['registeruser'])
  }
}
