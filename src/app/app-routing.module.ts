import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderComponent } from './components/order/order.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SellerLoginComponent } from './components/seller-login/seller-login.component';
import { SellerProfileComponent } from './components/seller-profile/seller-profile.component';
import { SellerRegisterComponent } from './components/seller-register/seller-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { SellerGuardGuard } from './services/seller-guard.guard';
import { UserGuardGuard } from './services/user-guard.guard';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"contactus",component:ContactUsComponent},
    {path:"aboutus",component:AboutUsComponent},
    {path:"singup",component:ProfileComponent},
    
    {path:"registeruser",component:UserRegisterComponent},
    {path:"userlogin",component:UserLoginComponent},
    {path:"userprofile",component:UserProfileComponent},


    {path:"sellerregister",component:SellerRegisterComponent},
    {path:"sellerlogin",component:SellerLoginComponent},
    {path:"sellerprofile",component:SellerProfileComponent},

    {path:"allproducts",component:ProductsComponent},
    {path:"cart",component:CartComponent,canActivate:[UserGuardGuard]},
    {path:"productdetails/:id",component:ProductDetailsComponent,canActivate:[AuthGuardGuard]},
    {path:"addproduct",component:AddProductComponent,canActivate:[SellerGuardGuard]},
    {path:"order/:id",component:OrderComponent,canActivate:[UserGuardGuard]},




    
  {path:"home",component:HomeComponent},
   {path:"**",component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
