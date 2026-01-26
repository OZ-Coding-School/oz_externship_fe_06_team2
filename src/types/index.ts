export interface QnaCategory {
  id: number
  depth: number
  names: string[]
}

export interface QnaAuthor {
  id: number
  nickname: string
  profile_image_url: string
}

export interface QnaItem {
  id: number
  category: QnaCategory
  author: QnaAuthor
  title: string
  content_preview: string
  answer_count: number
  view_count: number
  created_at: string
  thumbnail_img_url: string
}

export interface QnaListResponse {
  count: number
  next: string | null
  previous: string | null
  results: QnaItem[]
}
export interface QnaImage {
  id: number
  img_url: string
}
export interface QnaAnswer {
  id: number
  content: string
  author: QnaAuthor
  created_at: string
}
export interface QnaDetailResponse {
  id: number
  title: string
  content: string
  category: QnaCategory
  author: {
    id: number
    nickname: string
    profile_image_url: string | null
  }
  images: QnaImage[] // mockData에 있는 이미지 리스트
  view_count: number
  created_at: string
  answers: QnaAnswer[]
  // 썸네일은 리스트용일 경우가 많으나, 상세에서도 필요하다면 유지합니다.
  // mockData에 맞추어 optional(?) 또는 null 허용 처리를 합니다.
  thumbnail_img_url?: string | null
}
