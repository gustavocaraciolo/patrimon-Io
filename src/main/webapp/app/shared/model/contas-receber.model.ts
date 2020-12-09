import { Moment } from 'moment';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IContasReceber {
  id?: number;
  dtRecebido?: Moment;
  dtRecebimento?: Moment;
  valor?: number;
  pago?: Status;
}

export class ContasReceber implements IContasReceber {
  constructor(public id?: number, public dtRecebido?: Moment, public dtRecebimento?: Moment, public valor?: number, public pago?: Status) {}
}
