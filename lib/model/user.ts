import { IResponse } from "@/lib/types";
import { HttpStatusCode } from "axios";

export interface IUser {
  email: string;        // required, unique
  avatarURL: string;   // optional
  displayName: string;
  _id: string
  phoneNumber: string
}


export class Users implements IResponse<IUser[]> {
  data: IUser[];
  status: HttpStatusCode;
  constructor() {
    this.status = HttpStatusCode.BadRequest
    this.data = []
  }
}
export class OnlineUsers implements IResponse<string[]> {
  data: [];
  status: HttpStatusCode;
  constructor() {
    this.status = HttpStatusCode.BadRequest
    this.data = []
  }
}
export class User implements IResponse<IUser> {
  data: IUser;
  status: HttpStatusCode;
  constructor() {
    this.status = HttpStatusCode.Ok
    this.data = {
      email: '',
      avatarURL: '',
      displayName: '',
      _id: '',
      phoneNumber: '',
    }
  }
}
