import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { Moeda } from 'app/shared/model/enumerations/moeda.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IAPagar {
  id?: number;
  dtPagamento?: Moment;
  dtVencimento?: Moment;
  valor?: number;
  moeda?: Moeda;
  descricao?: string;
  status?: Status;
  comprovantePagamentoContentType?: string;
  comprovantePagamento?: any;
  user?: IUser;
}

export class APagar implements IAPagar {
  constructor(
    public id?: number,
    public dtPagamento?: Moment,
    public dtVencimento?: Moment,
    public valor?: number,
    public moeda?: Moeda,
    public descricao?: string,
    public status?: Status,
    public comprovantePagamentoContentType?: string,
    public comprovantePagamento?: any,
    public user?: IUser
  ) {}
}
