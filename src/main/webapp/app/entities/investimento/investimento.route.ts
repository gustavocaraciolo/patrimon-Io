import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInvestimento, Investimento } from 'app/shared/model/investimento.model';
import { InvestimentoService } from './investimento.service';
import { InvestimentoComponent } from './investimento.component';
import { InvestimentoDetailComponent } from './investimento-detail.component';
import { InvestimentoUpdateComponent } from './investimento-update.component';

@Injectable({ providedIn: 'root' })
export class InvestimentoResolve implements Resolve<IInvestimento> {
  constructor(private service: InvestimentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInvestimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((investimento: HttpResponse<Investimento>) => {
          if (investimento.body) {
            return of(investimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Investimento());
  }
}

export const investimentoRoute: Routes = [
  {
    path: '',
    component: InvestimentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.investimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InvestimentoDetailComponent,
    resolve: {
      investimento: InvestimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.investimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InvestimentoUpdateComponent,
    resolve: {
      investimento: InvestimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.investimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InvestimentoUpdateComponent,
    resolve: {
      investimento: InvestimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.investimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
