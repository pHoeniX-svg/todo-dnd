export interface IUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ITodo {
  user: IUser['id'];
  id: string;
  text: string;
  
}
