import { IResponse } from "@/lib/types";
import { TypePartialUser } from "@/lib/types/response/user";
import { HttpStatusCode } from "axios";

export class Users implements IResponse<TypePartialUser[]> {
  data: TypePartialUser[];
  status: HttpStatusCode;
  constructor() {
    this.status = HttpStatusCode.BadRequest
    this.data = []
  }
}
export class User implements IResponse<TypePartialUser> {
  data: TypePartialUser;
  status: HttpStatusCode;
  constructor() {
    this.status = HttpStatusCode.BadRequest
    this.data = {}
  }
}
