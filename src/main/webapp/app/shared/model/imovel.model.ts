import { IUser } from 'app/core/user/user.model';
import { IContasReceber } from 'app/shared/model/contas-receber.model';
import { IContasPagar } from 'app/shared/model/contas-pagar.model';

export interface IImovel {
  id?: number;
  nome?: string;
  projetoContentType?: string;
  projeto?: any;
  user?: IUser;
  contasReceber?: IContasReceber;
  contasPagar?: IContasPagar;
}

export class Imovel implements IImovel {
  constructor(
    public id?: number,
    public nome?: string,
    public projetoContentType?: string,
    public projeto?: any,
    public user?: IUser,
    public contasReceber?: IContasReceber,
    public contasPagar?: IContasPagar
  ) {}
}
