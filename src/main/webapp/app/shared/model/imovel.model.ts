import { IUser } from 'app/core/user/user.model';

export interface IImovel {
  id?: number;
  nome?: string;
  projetoContentType?: string;
  projeto?: any;
  user?: IUser;
}

export class Imovel implements IImovel {
  constructor(public id?: number, public nome?: string, public projetoContentType?: string, public projeto?: any, public user?: IUser) {}
}
