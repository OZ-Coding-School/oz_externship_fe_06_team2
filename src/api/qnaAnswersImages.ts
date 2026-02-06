import axios from 'axios'
import { api } from './api'
import { useAuthStore } from '@/store'

/**
 * S3 이미지 업로드를 위한 Presigned URL 발급 응답 타입
 */
export interface PresignedUrlResponse {
  presigned_url: string
  img_url: string
  key: string
}

/**
 * S3 이미지 업로드를 위한 Presigned URL 발급 요청 (답변용)
 * @param fileName - 업로드할 파일명 (예: "example.png")
 * @returns presigned_url, img_url, key
 */
export async function getPresignedUrl(
  fileName: string
): Promise<PresignedUrlResponse> {
  const accessToken = useAuthStore.getState().accessToken
  const res = await api.put<PresignedUrlResponse>(
    'https://api.ozcodingschool.site/api/v1/qna/answers/presigned-url',
    { file_name: fileName },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return res.data
}

/**
 * Presigned URL을 사용하여 S3에 파일 업로드
 * @param presignedUrl - 백엔드에서 발급받은 Presigned URL
 * @param file - 업로드할 파일
 */
export async function uploadToS3(
  presignedUrl: string,
  file: File
): Promise<void> {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
}
