import { HttpStatusCode } from "axios";

export interface IResponse<T> {
  data: T,
  status: HttpStatusCode
}