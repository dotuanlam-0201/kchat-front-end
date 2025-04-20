export interface IUser {
  email: string;        // required, unique
  password: string;     // required
  avatarURL?: string;   // optional
  displayName?: string;
  _id: string
}