import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subject = new BehaviorSubject("Sing Up")
  constructor() { }

  login(token:string){
    localStorage.setItem('token',token)
  }

  logout(){
    localStorage.removeItem('token')
  }

  isLogged():boolean{
    if(localStorage.getItem('token')){
      return true
    }
    else{
      return false
    }
  }

  isSeller(){
    if(localStorage.getItem('role') == "seller"){
      return true
    }
    else{
      return false
    }
  }


  isUser(){
    if(localStorage.getItem('role') == "user"){
      return true
    }
    else{
      return false
    }
  }


  get():string{
    let name = ""
      this.subject.subscribe({
        next: (v) => 
        {
          name = v       
        }
      });
    return name
  }

  set(name:string){
    this.subject.next(name)
  }
}
