import {
  IsBoolean,
  IsEmail,
  IsString,
  IsNumber,
  IsDate,
} from "class-validator";

import { ISystemUserMutable, ISystemUser } from "./interfaces";

export class SystemUserMutable implements ISystemUserMutable {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsBoolean()
  emailConfirmed: boolean;

  constructor(
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    emailConfirmed: boolean
  ) {
    this.email = email;
    this.emailConfirmed = emailConfirmed;
    this.isAdmin = isAdmin;
    this.password = password;
    this.username = username;
  }
}

export class SystemUser implements ISystemUser {
  @IsNumber()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsBoolean()
  emailConfirmed: boolean;

  constructor(
    id: string,
    createdAt: Date,
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
    emailConfirmed: boolean
  ) {
    this.createdAt = createdAt;
    this.email = email;
    this.emailConfirmed = emailConfirmed;
    this.id = id;
    this.isAdmin = isAdmin;
    this.password = password;
    this.username = username;
  }
}
