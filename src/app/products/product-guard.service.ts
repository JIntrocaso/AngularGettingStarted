import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // tslint:disable-next-line:prefer-const
    let id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      alert('Invalid product Id');
      this._router.navigate(['/products']);
    }
    return true;
  }

  constructor(private _router: Router) { }

}
