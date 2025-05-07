import { IUser } from "@/lib/model/user";
import { IResponse } from "@/lib/types";
import { HttpStatusCode } from "axios";

export interface IMessage {
  _id?: string
  author?: IUser;
  roomId?: string;
  text?: string;
  fileURL?: string;
  imgURL?: string;
  reactions?: string[];
  createdAt?: string
}

export interface ILastMessage extends IMessage {
  isNewMessage?: boolean
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