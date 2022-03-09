export interface IUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  roles: [Editor: 1358, Admin?: 6329];
  refreshToken?: string;
}

