import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IImovel {
  id?: number;
  nome?: string;
  projetoContentType?: string;
  projeto?: any;
  tabelaPrecoContentType?: string;
  tabelaPreco?: any;
  contratoContentType?: string;
  contrato?: any;
  valorTotal?: number;
  dtInicialPagamento?: Moment;
  dtFinalPagamento?: Moment;
  diaPreferencialPgmt?: Moment;
  user?: IUser;
}

export class Imovel implements IImovel {
  constructor(
    public id?: number,
    public nome?: string,
    public projetoContentType?: string,
    public projeto?: any,
    public tabelaPrecoContentType?: string,
    public tabelaPreco?: any,
    public contratoContentType?: string,
    public contrato?: any,
    public valorTotal?: number,
    public dtInicialPagamento?: Moment,
    public dtFinalPagamento?: Moment,
    public diaPreferencialPgmt?: Moment,
    public user?: IUser
  ) {}
}
