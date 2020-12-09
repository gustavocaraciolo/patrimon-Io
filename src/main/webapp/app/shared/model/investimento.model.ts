import { IUser } from 'app/core/user/user.model';
import { TipoIvestimento } from 'app/shared/model/enumerations/tipo-ivestimento.model';

export interface IInvestimento {
  id?: number;
  investimento?: TipoIvestimento;
  user?: IUser;
}

export class Investimento implements IInvestimento {
  constructor(public id?: number, public investimento?: TipoIvestimento, public user?: IUser) {}
}
