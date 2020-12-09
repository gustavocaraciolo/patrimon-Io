import { Moment } from 'moment';
import { IImovel } from 'app/shared/model/imovel.model';
import { Moeda } from 'app/shared/model/enumerations/moeda.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IAReceber {
  id?: number;
  dtRecebido?: Moment;
  dtRecebimento?: Moment;
  valor?: number;
  moeda?: Moeda;
  descricao?: string;
  status?: Status;
  comprovantePagamentoContentType?: string;
  comprovantePagamento?: any;
  imovel?: IImovel;
}

export class AReceber implements IAReceber {
  constructor(
    public id?: number,
    public dtRecebido?: Moment,
    public dtRecebimento?: Moment,
    public valor?: number,
    public moeda?: Moeda,
    public descricao?: string,
    public status?: Status,
    public comprovantePagamentoContentType?: string,
    public comprovantePagamento?: any,
    public imovel?: IImovel
  ) {}
}
