import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContasReceber } from 'app/shared/model/contas-receber.model';

type EntityResponseType = HttpResponse<IContasReceber>;
type EntityArrayResponseType = HttpResponse<IContasReceber[]>;

@Injectable({ providedIn: 'root' })
export class ContasReceberService {
  public resourceUrl = SERVER_API_URL + 'api/contas-recebers';

  constructor(protected http: HttpClient) {}

  create(contasReceber: IContasReceber): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contasReceber);
    return this.http
      .post<IContasReceber>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(contasReceber: IContasReceber): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(contasReceber);
    return this.http
      .put<IContasReceber>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IContasReceber>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IContasReceber[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(contasReceber: IContasReceber): IContasReceber {
    const copy: IContasReceber = Object.assign({}, contasReceber, {
      dtRecebido: contasReceber.dtRecebido && contasReceber.dtRecebido.isValid() ? contasReceber.dtRecebido.format(DATE_FORMAT) : undefined,
      dtRecebimento:
        contasReceber.dtRecebimento && contasReceber.dtRecebimento.isValid() ? contasReceber.dtRecebimento.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((contasReceber: IContasReceber) => {
        contasReceber.dtRecebido = contasReceber.dtRecebido ? moment(contasReceber.dtRecebido) : undefined;
        contasReceber.dtRecebimento = contasReceber.dtRecebimento ? moment(contasReceber.dtRecebimento) : undefined;
      });
    }
    return res;
  }
}
