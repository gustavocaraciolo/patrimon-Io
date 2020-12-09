import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAPagar } from 'app/shared/model/a-pagar.model';

type EntityResponseType = HttpResponse<IAPagar>;
type EntityArrayResponseType = HttpResponse<IAPagar[]>;

@Injectable({ providedIn: 'root' })
export class APagarService {
  public resourceUrl = SERVER_API_URL + 'api/a-pagars';

  constructor(protected http: HttpClient) {}

  create(aPagar: IAPagar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aPagar);
    return this.http
      .post<IAPagar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(aPagar: IAPagar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aPagar);
    return this.http
      .put<IAPagar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAPagar>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAPagar[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  byMonth(month: string): Observable<EntityResponseType> {
    return this.http
      .get(`api/a-pagar-by-month/${month}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(aPagar: IAPagar): IAPagar {
    const copy: IAPagar = Object.assign({}, aPagar, {
      dtPagamento: aPagar.dtPagamento && aPagar.dtPagamento.isValid() ? aPagar.dtPagamento.format(DATE_FORMAT) : undefined,
      dtVencimento: aPagar.dtVencimento && aPagar.dtVencimento.isValid() ? aPagar.dtVencimento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dtPagamento = res.body.dtPagamento ? moment(res.body.dtPagamento) : undefined;
      res.body.dtVencimento = res.body.dtVencimento ? moment(res.body.dtVencimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((aPagar: IAPagar) => {
        aPagar.dtPagamento = aPagar.dtPagamento ? moment(aPagar.dtPagamento) : undefined;
        aPagar.dtVencimento = aPagar.dtVencimento ? moment(aPagar.dtVencimento) : undefined;
      });
    }
    return res;
  }
}
