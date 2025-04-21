export interface IUser {
  email: string;        // required, unique
  avatarURL: string;   // optional
  displayName: string;
  _id: string
  phoneNumber: string
}

export type TypePartialUser = Partial<IUser>
