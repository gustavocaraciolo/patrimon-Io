import { Moment } from 'moment';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IContasPagar {
  id?: number;
  dtPagamento?: Moment;
  dtVencimento?: Moment;
  valor?: number;
  pago?: Status;
}

export class ContasPagar implements IContasPagar {
  constructor(public id?: number, public dtPagamento?: Moment, public dtVencimento?: Moment, public valor?: number, public pago?: Status) {}
}
