import { IUser } from "@/lib/model/user";

export interface IMessage {
  text: string,
  emotions: string[],
  author: IUser
  file: {
    imgURL?: string,
    file?: string
    type?: 'img' | 'file'
  }
}