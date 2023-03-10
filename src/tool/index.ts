import { RcFile } from "antd/es/upload";

export interface IResponse {
    code: number
    data: any,
    error: any
}

export async function uploadFile(file: RcFile): Promise<IResponse> {
    const formData = new FormData()
    formData.append('file', file)

    return fetch('/api/upload', {
      method: 'POST',
      body: formData
    }).then((res) => res.json())
}