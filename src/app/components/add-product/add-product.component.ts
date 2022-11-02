import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }
  productForm = this.fb.group({
    title: (['', [Validators.required]]),
    desc: (['', [Validators.required]]),
    color: (['', [Validators.required]]),
    price: (['', [Validators.required]]),
    size: (['', [Validators.required]]),
    img: (['', [Validators.required]]),
    amount: (['', [Validators.required]]),


  })

  Name = ""
  product: Product = {} as Product
  ngOnInit(): void {

    this.Name = localStorage.getItem('FullName')?.split(' ')[0] || ""
  }
  Submit() {
    var { title, img, color, desc, size } = this.productForm.value
    var price = this.productForm.value.price || 0
    var amount = this.productForm.value.price || 0
    this.product.Title = title || ""
    this.product.Color = color || ""
    this.product.Price = +price || 0
    this.product.Description = desc || ""
    this.product.Size = size || ""
    this.product.Img = img || ""
    this.product.ProductAmount = +amount || 0
    this.api.AddProduct(this.product).subscribe({


      next: (prd) => {
        console.log(prd);
        this.router.navigate(['allproducts'])
      },
      error: (err) => {
        alert(err.error);
      }
    })

  }

}
