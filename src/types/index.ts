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

export type SearchFilterOption =
  | 'author'
  | 'title'
  | 'content'
  | 'title_or_content'
export type SortOption =
  | 'latest'
  | 'oldest'
  | 'most_views'
  | 'most_likes'
  | 'most_comments'

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

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

export interface QnaComment {
  id: number
  content: string
  created_at: string
  author: QnaAuthor
}

export interface QnaAnswer {
  id: number
  content: string
  created_at: string
  is_adopted: boolean
  author: QnaAuthor
  comments: QnaComment[]
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

export interface GetCommunityPostsParams {
  page?: number
  page_size?: number
  search?: string
  search_filter?: SearchFilterOption
  category_id?: number
  sort?: SortOption
}

export interface CreateQnaPostBody {
  title: string
  content: string
  category_id: number
}

export interface CreateQnaPostResponse {
  detail: string
  pk: number
}
