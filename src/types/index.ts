export interface QnaCategory {
  id: number
  depth: number
  names: string[]
}

export interface QnaAuthor {
  id: number
  nickname: string
  profile_image_url: string | null
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
  thumbnail_img_url: string | null
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
  created_at: string
  is_adopted: boolean
  author: QnaAuthor
  comments: QnaComment[]
}
export interface QnaComment {
  id: number
  content: string
  created_at: string
  author: QnaAuthor
}
export interface QnaDetailResponse {
  id: number
  title: string
  content: string
  category: QnaCategory
  author: QnaAuthor
  images: QnaImage[]
  view_count: number
  created_at: string
  answers: QnaAnswer[]
  thumbnail_img_url?: string | null
}
