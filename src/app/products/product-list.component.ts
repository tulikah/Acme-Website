import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = 'Product List';
  imageWidth = '50px';
  imageMargin = '3px';
  showImage = false;
  filteredproducts: IProduct[];
  _filteredBy: string;
  errorMes: string;

  get filteredBy(): string {
      return this._filteredBy;
  }

  set filteredBy(value: string) {
      this._filteredBy = value;
      this.filteredproducts = this.filteredBy ? this.performFilter(this.filteredBy) : this.products;
  }

  products: IProduct[];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products,
        this.filteredproducts = this.products;
      },
      error => this.errorMes = <any>error
    );
  
  }

  constructor(private productService: ProductService) {  
  }

  onRatingClicked(message: string): void{
    this.pageTitle + ":" + message;
  }

  performFilter(filteredBy: string): IProduct[] {
    filteredBy = filteredBy.toLocaleLowerCase();
    // return this.filteredBy;
    return this.products.filter((product: IProduct) =>
        product.productName.toLowerCase().indexOf(filteredBy) !== -1
    );
  }
}
