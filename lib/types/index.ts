import { HttpStatusCode } from "axios";

export interface IResponse<T> {
  data: T,
  status: HttpStatusCode
}

export class CommonResponse implements IResponse<any> {
  data: any
  status: HttpStatusCode
  constructor() {
    this.data = {}
    this.status = HttpStatusCode.BadRequest
  }
}