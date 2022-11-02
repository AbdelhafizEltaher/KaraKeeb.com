import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { catchError, observable, Observable, retry, throwError } from 'rxjs';
import { Seller } from '../models/seller';
import { Product } from '../models/product';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions={};
  private tokenOption={}
private token = ` Token ${localStorage.getItem('token')}`
  constructor(private http : HttpClient) {
    this.httpOptions={
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.tokenOption={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'token':this.token
      })
    };
    
   }



   ///////////////////////////////////////////////////////////////////////////////////////
   //user

  RegisterUser(newuser:User):Observable<User>{
    return this.http.post<User>('http://localhost:3000/api/KarKeeb/User/Auth/Register',newuser,this.httpOptions)
  }
  LoginUser(LoginObj:object){
    return this.http.post<User>('http://localhost:3000/api/KarKeeb/User/Auth/Login',LoginObj,this.httpOptions)
  }
  UpdateUser(newuser:User,id:number):Observable<User>{
    return this.http.put<User>(`http://localhost:3000/${id}`,newuser,this.httpOptions)
  }
  DeletUser(id:number){
    return this.http.delete<User>(`http://localhost:3000/${id}`,this.httpOptions)
  }
  GetAllUsers(){
    return this.http.get<User>(`http://localhost:3000/`,this.httpOptions)
  }
  GetUserByID(id:string){
    return this.http.get<User>(`http://localhost:3000/api/KarKeeb/User/${id}`,this.tokenOption)
  }





  AddToCart(item:object,id:string):Observable<User>{   
    return this.http.put<User>(`http://localhost:3000/api/KarKeeb/User/${id}`,item,this.tokenOption)
  }



  ///////////////////////////////////////////////////////////////////////////////////////////////////
  /// seller

  



  RegisterSeller(newseller:Seller):Observable<User>{
    return this.http.post<Seller>('http://localhost:3000/api/KarKeeb/Seller/Auth/Register',newseller,this.httpOptions)
  }
  LoginSeller(LoginObj:object){
    return this.http.post<Seller>('http://localhost:3000/api/KarKeeb/Seller/Auth/Login',LoginObj,this.httpOptions)
  }


  GetSellerByID(id:string){
    return this.http.get<Seller>(`http://localhost:3000/api/KarKeeb/Seller/${id}`,this.tokenOption)
  }





//////////////////////////////////////////////////////////////////////////////////////////////////////
///product




  GetAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/KarKeeb/Product')
  }
  GetProductByID(id:string):Observable<Product>{
    return this.http.get<Product>(`http://localhost:3000/api/KarKeeb/Product/${id}`)
  }
  GetProductBySellerName(seller:string):Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:3000/api/KarKeeb/Product/?seller=${seller}`)
  }

  AddProduct(product:Product):Observable<Product>{   
    return this.http.post<Product>(`http://localhost:3000/api/KarKeeb/Product/`,product,this.tokenOption)
  }

 
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add order


MakeOrder(ord:Order):Observable<Order>{
  return this.http.post<Order>(`http://localhost:3000/api/KarKeeb/Order/`,ord,this.tokenOption)
}
deletOrder(id:string){
  return this.http.delete<Order>(`http://localhost:3000/api/KarKeeb/Order/${id}`,this.tokenOption)

}
}
















