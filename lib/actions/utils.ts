import { http } from "@/lib/configs/axios";
import { IResponse } from "@/lib/types";

export const uploadFile = async (file: File): Promise<IResponse<string>> => {

  const formData = new FormData()
  formData.append('file', file)
  return await http.post('/upload/single', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}