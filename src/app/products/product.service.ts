import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IProduct } from './product';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';

@Injectable()
export class ProductService {
    private _productUrl = './api/products/products.json';
    product: IProduct;
    constructor(private _http: HttpClient) {

    }

    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._productUrl)
                    .do(data => console.log('All: ' + JSON.stringify(data)))
                    .catch(this.handleError);
    }

    getProduct(productId: number): Observable<IProduct> {
        const id = productId;
        return this.getProducts().map(products => {
            return products.filter(item => item.productId === id)[0];
        })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
