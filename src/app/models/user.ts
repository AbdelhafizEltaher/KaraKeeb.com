import { Product } from "./product"
export interface User {
    FullName:string
    UserName:string
    password:string
    Email:string
    AccessToken?:string
    _id?:string
    Products?:Array<string>
}
