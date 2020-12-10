import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IImovel } from 'app/shared/model/imovel.model';

type EntityResponseType = HttpResponse<IImovel>;
type EntityArrayResponseType = HttpResponse<IImovel[]>;

@Injectable({ providedIn: 'root' })
export class ImovelService {
  public resourceUrl = SERVER_API_URL + 'api/imovels';

  constructor(protected http: HttpClient) {}

  create(imovel: IImovel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imovel);
    return this.http
      .post<IImovel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(imovel: IImovel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imovel);
    return this.http
      .put<IImovel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IImovel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IImovel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(imovel: IImovel): IImovel {
    const copy: IImovel = Object.assign({}, imovel, {
      dtInicialPagamento:
        imovel.dtInicialPagamento && imovel.dtInicialPagamento.isValid() ? imovel.dtInicialPagamento.format(DATE_FORMAT) : undefined,
      dtFinalPagamento:
        imovel.dtFinalPagamento && imovel.dtFinalPagamento.isValid() ? imovel.dtFinalPagamento.format(DATE_FORMAT) : undefined,
      diaPreferencialPgmt:
        imovel.diaPreferencialPgmt && imovel.diaPreferencialPgmt.isValid() ? imovel.diaPreferencialPgmt.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dtInicialPagamento = res.body.dtInicialPagamento ? moment(res.body.dtInicialPagamento) : undefined;
      res.body.dtFinalPagamento = res.body.dtFinalPagamento ? moment(res.body.dtFinalPagamento) : undefined;
      res.body.diaPreferencialPgmt = res.body.diaPreferencialPgmt ? moment(res.body.diaPreferencialPgmt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((imovel: IImovel) => {
        imovel.dtInicialPagamento = imovel.dtInicialPagamento ? moment(imovel.dtInicialPagamento) : undefined;
        imovel.dtFinalPagamento = imovel.dtFinalPagamento ? moment(imovel.dtFinalPagamento) : undefined;
        imovel.diaPreferencialPgmt = imovel.diaPreferencialPgmt ? moment(imovel.diaPreferencialPgmt) : undefined;
      });
    }
    return res;
  }
}
