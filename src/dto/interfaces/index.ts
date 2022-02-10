export interface ISystemUserMutable {
  username: string;
  email: string;
  password: string | null;
  isAdmin: boolean;
  emailConfirmed: boolean;
}

export interface ISystemUser extends ISystemUserMutable {
  id: string;
  createdAt: Date;
}

export interface IPostMutable {
  title: string;
  content: string;
  authorId: string;
}

export interface IPost extends IPostMutable {
  id: string;
  createdAt: Date;
  author: ISystemUser | null;
}
