import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    private productUrl = 'api/products/products.json';

constructor(private http: HttpClient){}

getProducts(): Observable<IProduct[]> {
return this.http.get<IProduct[]>(this.productUrl).pipe(
    tap(data => {console.log('All:' + JSON.stringify(data))}), 
    catchError(this.handleError)
);
}
    private handleError(err:HttpErrorResponse){
       let errorMes = '';
       if(err.error instanceof ErrorEvent){
        errorMes = `Error occured: ${err.error.message}`
       } else {
           errorMes = `The error returned by server is ${err.status}, ${err.message}`
       }
       console.log(errorMes)
       return throwError(errorMes);
    }
}