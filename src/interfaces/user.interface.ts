export interface IUserAdd {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
