export interface ICard {
  likes: IUser[];
  owner: IUser;
  name: string;
  link: string;
  _id: string;
  createdAt: string;
}

export interface IUser {
  name?: string;
  avatar?: string;
  _id?: string;
  link?: string;
  about?: string;
}
