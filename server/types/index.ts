export interface IUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
  roles: number[];
  refreshToken?: string;
}
