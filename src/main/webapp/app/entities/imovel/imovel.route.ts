import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IImovel, Imovel } from 'app/shared/model/imovel.model';
import { ImovelService } from './imovel.service';
import { ImovelComponent } from './imovel.component';
import { ImovelDetailComponent } from './imovel-detail.component';
import { ImovelUpdateComponent } from './imovel-update.component';

@Injectable({ providedIn: 'root' })
export class ImovelResolve implements Resolve<IImovel> {
  constructor(private service: ImovelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImovel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((imovel: HttpResponse<Imovel>) => {
          if (imovel.body) {
            return of(imovel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Imovel());
  }
}

export const imovelRoute: Routes = [
  {
    path: '',
    component: ImovelComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.imovel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ImovelDetailComponent,
    resolve: {
      imovel: ImovelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.imovel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ImovelUpdateComponent,
    resolve: {
      imovel: ImovelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.imovel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ImovelUpdateComponent,
    resolve: {
      imovel: ImovelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patrimonIoApp.imovel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
