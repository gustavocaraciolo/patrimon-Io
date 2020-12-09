import { IUser } from 'app/core/user/user.model';

export interface IImovel {
  id?: number;
  nome?: string;
  user?: IUser;
}

export class Imovel implements IImovel {
  constructor(public id?: number, public nome?: string, public user?: IUser) {}
}
