import "reflect-metadata";

import { IUserRepository } from "../repositories";
import { ISystemUserMutable, ISystemUser } from "../dto";

export interface IUserServiceInit {
  userRepository: IUserRepository;
}

export interface IUserService {
  UserRepository: IUserRepository;
  Create(input: ISystemUserMutable): Promise<ISystemUser>;
}

export class UserService {
  private _userRepository: IUserRepository;

  private get UserRepository(): IUserRepository {
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
