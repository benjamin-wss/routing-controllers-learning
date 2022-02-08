import "reflect-metadata";

import { IUser } from "../repositories";
import { ISystemUserMutable, ISystemUser } from "../dto";

export interface IUserServiceInit {
  userRepository: IUser;
}

export interface IUserService {
  UserRepository: IUser;
  Create(input: ISystemUserMutable): Promise<ISystemUser>;
}

export class UserService {
  private _userRepository: IUser;

  private get UserRepository(): IUser {
    return this._userRepository;
  }

  constructor(parameters: IUserServiceInit) {
    this._userRepository = parameters.userRepository;
  }

  async Create(input: ISystemUserMutable): Promise<ISystemUser> {
    const result = this.UserRepository.create(input);

    return result;
  }
}
