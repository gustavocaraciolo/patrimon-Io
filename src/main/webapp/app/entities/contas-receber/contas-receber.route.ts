import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContasReceber, ContasReceber } from 'app/shared/model/contas-receber.model';
import { ContasReceberService } from './contas-receber.service';
import { ContasReceberComponent } from './contas-receber.component';
import { ContasReceberDetailComponent } from './contas-receber-detail.component';
import { ContasReceberUpdateComponent } from './contas-receber-update.component';

@Injectable({ providedIn: 'root' })
export class ContasReceberResolve implements Resolve<IContasReceber> {
  constructor(private service: ContasReceberService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContasReceber> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contasReceber: HttpResponse<ContasReceber>) => {
          if (contasReceber.body) {
            return of(contasReceber.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContasReceber());
  }
}

export const contasReceberRoute: Routes = [
  {
    path: '',
    component: ContasReceberComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.contasReceber.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContasReceberDetailComponent,
    resolve: {
      contasReceber: ContasReceberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.contasReceber.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContasReceberUpdateComponent,
    resolve: {
      contasReceber: ContasReceberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.contasReceber.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContasReceberUpdateComponent,
    resolve: {
      contasReceber: ContasReceberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.contasReceber.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
