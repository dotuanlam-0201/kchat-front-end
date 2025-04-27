import { IUser } from "@/lib/model/user";
import { IResponse } from "@/lib/types";
import { HttpStatusCode } from "axios";

export interface IMessage {
  author?: IUser;
  roomId?: string;
  text?: string;
  fileURL?: string;
  imgURL?: string;
  emotions?: string[];
}

export interface IMessagePayload extends Omit<IMessage, 'author'> {
  author: string
}

export class Messages implements IResponse<IMessage[]> {
  data: IMessage[];
  status: HttpStatusCode;
  constructor() {
    this.data = []
    this.status = HttpStatusCode.Ok
  }
}