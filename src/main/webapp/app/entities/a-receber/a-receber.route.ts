import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAReceber, AReceber } from 'app/shared/model/a-receber.model';
import { AReceberService } from './a-receber.service';
import { AReceberComponent } from './a-receber.component';
import { AReceberDetailComponent } from './a-receber-detail.component';
import { AReceberUpdateComponent } from './a-receber-update.component';

@Injectable({ providedIn: 'root' })
export class AReceberResolve implements Resolve<IAReceber> {
  constructor(private service: AReceberService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAReceber> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((aReceber: HttpResponse<AReceber>) => {
          if (aReceber.body) {
            return of(aReceber.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AReceber());
  }
}

export const aReceberRoute: Routes = [
  {
    path: '',
    component: AReceberComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.aReceber.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AReceberDetailComponent,
    resolve: {
      aReceber: AReceberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.aReceber.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AReceberUpdateComponent,
    resolve: {
      aReceber: AReceberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.aReceber.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AReceberUpdateComponent,
    resolve: {
      aReceber: AReceberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.aReceber.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
