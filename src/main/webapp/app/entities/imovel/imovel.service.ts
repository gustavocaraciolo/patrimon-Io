import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.post<IImovel>(this.resourceUrl, imovel, { observe: 'response' });
  }

  update(imovel: IImovel): Observable<EntityResponseType> {
    return this.http.put<IImovel>(this.resourceUrl, imovel, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IImovel>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IImovel[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
