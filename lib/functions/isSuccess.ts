import { CommonResponse } from "@/lib/types";
import { HttpStatusCode } from "axios";
import { includes } from "lodash";

export function isSuccess(res: CommonResponse) {
  return includes([HttpStatusCode.Accepted, HttpStatusCode.Created, HttpStatusCode.Ok], res.status)
}