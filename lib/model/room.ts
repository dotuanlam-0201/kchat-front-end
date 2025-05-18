import { IMessage } from "@/lib/model/message";
import { IUser } from "@/lib/model/user";
import { IResponse } from "@/lib/types";
import { ROOM_TYPE } from "@/lib/types/room";
import { HttpStatusCode } from "axios";

export interface IRoom {
  _id: string
  participants: Array<IUser>
  lastMessage: IMessage
  type: ROOM_TYPE
}

export class Rooms implements IResponse<IRoom[]> {
  data: IRoom[];
  status: HttpStatusCode;
  constructor() {
    this.data = []
    this.status = HttpStatusCode.Ok
  }
}

export class Room implements IResponse<IRoom> {
  data: IRoom;
  status: HttpStatusCode;
  constructor() {
    this.data = {
      _id: '',
      participants: [],
      lastMessage: {
      },
      type: ROOM_TYPE.single
    }
    this.status = HttpStatusCode.BadRequest
  }
}