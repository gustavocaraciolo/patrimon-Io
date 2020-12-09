import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContasPagar } from 'app/shared/model/contas-pagar.model';

type EntityResponseType = HttpResponse<IContasPagar>;
type EntityArrayResponseType = HttpResponse<IContasPagar[]>;

@Injectable({ providedIn: 'root' })
export class ContasPagarService {
  public resourceUrl = SERVER_API_URL + 'api/contas-pagars';

  constructor(protected http: HttpClient) {}

  create(contasPagar: IContasPagar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contasPagar);
    return this.http
      .post<IContasPagar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(contasPagar: IContasPagar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contasPagar);
    return this.http
      .put<IContasPagar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IContasPagar>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IContasPagar[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(contasPagar: IContasPagar): IContasPagar {
    const copy: IContasPagar = Object.assign({}, contasPagar, {
      dtPagamento: contasPagar.dtPagamento && contasPagar.dtPagamento.isValid() ? contasPagar.dtPagamento.format(DATE_FORMAT) : undefined,
      dtVencimento:
        contasPagar.dtVencimento && contasPagar.dtVencimento.isValid() ? contasPagar.dtVencimento.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((contasPagar: IContasPagar) => {
        contasPagar.dtPagamento = contasPagar.dtPagamento ? moment(contasPagar.dtPagamento) : undefined;
        contasPagar.dtVencimento = contasPagar.dtVencimento ? moment(contasPagar.dtVencimento) : undefined;
      });
    }
    return res;
  }
}
