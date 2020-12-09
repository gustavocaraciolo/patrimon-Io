import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAPagar, APagar } from 'app/shared/model/a-pagar.model';
import { APagarService } from './a-pagar.service';
import { APagarComponent } from './a-pagar.component';
import { APagarDetailComponent } from './a-pagar-detail.component';
import { APagarUpdateComponent } from './a-pagar-update.component';

@Injectable({ providedIn: 'root' })
export class APagarResolve implements Resolve<IAPagar> {
  constructor(private service: APagarService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAPagar> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((aPagar: HttpResponse<APagar>) => {
          if (aPagar.body) {
            return of(aPagar.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new APagar());
  }
}

export const aPagarRoute: Routes = [
  {
    path: '',
    component: APagarComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.aPagar.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: APagarDetailComponent,
    resolve: {
      aPagar: APagarResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.aPagar.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: APagarUpdateComponent,
    resolve: {
      aPagar: APagarResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.aPagar.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: APagarUpdateComponent,
    resolve: {
      aPagar: APagarResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.aPagar.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
