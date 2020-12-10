import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInvestimento } from 'app/shared/model/investimento.model';

type EntityResponseType = HttpResponse<IInvestimento>;
type EntityArrayResponseType = HttpResponse<IInvestimento[]>;

@Injectable({ providedIn: 'root' })
export class InvestimentoService {
  public resourceUrl = SERVER_API_URL + 'api/investimentos';

  constructor(protected http: HttpClient) {}

  create(investimento: IInvestimento): Observable<EntityResponseType> {
    return this.http.post<IInvestimento>(this.resourceUrl, investimento, { observe: 'response' });
  }

  update(investimento: IInvestimento): Observable<EntityResponseType> {
    return this.http.put<IInvestimento>(this.resourceUrl, investimento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInvestimento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInvestimento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
