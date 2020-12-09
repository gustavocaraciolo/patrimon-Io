import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContasPagar, ContasPagar } from 'app/shared/model/contas-pagar.model';
import { ContasPagarService } from './contas-pagar.service';
import { ContasPagarComponent } from './contas-pagar.component';
import { ContasPagarDetailComponent } from './contas-pagar-detail.component';
import { ContasPagarUpdateComponent } from './contas-pagar-update.component';

@Injectable({ providedIn: 'root' })
export class ContasPagarResolve implements Resolve<IContasPagar> {
  constructor(private service: ContasPagarService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContasPagar> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contasPagar: HttpResponse<ContasPagar>) => {
          if (contasPagar.body) {
            return of(contasPagar.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContasPagar());
  }
}

export const contasPagarRoute: Routes = [
  {
    path: '',
    component: ContasPagarComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.contasPagar.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContasPagarDetailComponent,
    resolve: {
      contasPagar: ContasPagarResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.contasPagar.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContasPagarUpdateComponent,
    resolve: {
      contasPagar: ContasPagarResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.contasPagar.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContasPagarUpdateComponent,
    resolve: {
      contasPagar: ContasPagarResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.contasPagar.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
