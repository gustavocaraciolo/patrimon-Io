import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAReceber } from 'app/shared/model/a-receber.model';

type EntityResponseType = HttpResponse<IAReceber>;
type EntityArrayResponseType = HttpResponse<IAReceber[]>;

@Injectable({ providedIn: 'root' })
export class AReceberService {
  public resourceUrl = SERVER_API_URL + 'api/a-recebers';

  constructor(protected http: HttpClient) {}

  create(aReceber: IAReceber): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aReceber);
    return this.http
      .post<IAReceber>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(aReceber: IAReceber): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aReceber);
    return this.http
      .put<IAReceber>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAReceber>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAReceber[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(aReceber: IAReceber): IAReceber {
    const copy: IAReceber = Object.assign({}, aReceber, {
      dtRecebido: aReceber.dtRecebido && aReceber.dtRecebido.isValid() ? aReceber.dtRecebido.format(DATE_FORMAT) : undefined,
      dtRecebimento: aReceber.dtRecebimento && aReceber.dtRecebimento.isValid() ? aReceber.dtRecebimento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dtRecebido = res.body.dtRecebido ? moment(res.body.dtRecebido) : undefined;
      res.body.dtRecebimento = res.body.dtRecebimento ? moment(res.body.dtRecebimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((aReceber: IAReceber) => {
        aReceber.dtRecebido = aReceber.dtRecebido ? moment(aReceber.dtRecebido) : undefined;
        aReceber.dtRecebimento = aReceber.dtRecebimento ? moment(aReceber.dtRecebimento) : undefined;
      });
    }
    return res;
  }
}
