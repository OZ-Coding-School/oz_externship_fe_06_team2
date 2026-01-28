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

export type SearchFilterOption = 'author' | 'title' | 'content' | 'title_or_content'
export type SortOption = 'latest' | 'oldest' | 'most_views' | 'most_likes' | 'most_comments'

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

export interface CommunityCategory {
  id: number
  name: string
}

export interface CommunityAuthor {
  id: number
  nickname: string
  profile_img_url: string | null
}

export interface CommunityPostListItem {
  id: number
  author: CommunityAuthor
  title: string
  thumbnail_img_url: string | null
  content_preview: string
  comment_count: number
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
  category_id: number
}

export interface GetCommunityPostsParams {
  page?: number
  page_size?: number
  search?: string
  search_filter?: SearchFilterOption
  category_id?: number
  sort?: SortOption
}

export interface CreateCommunityPostBody {
  title: string
  content: string
  category_id: number
}

export interface CreateCommunityPostResponse {
  detail: string
  pk: number
}

export interface CommunityPostDetail {
  id: number
  author: CommunityAuthor
  title: string
  content: string
  thumbnail_img_url: string | null
  category: CommunityCategory
  view_count: number
  like_count: number
  comment_count: number
  created_at: string
  updated_at: string
  is_liked: boolean
  is_author: boolean
}

export interface DeleteCommunityPostResponse {
  detail: string
}

export interface CommunityComment {
  id: number
  author: CommunityAuthor
  content: string
  created_at: string
  updated_at: string
  is_author: boolean
}

export interface GetCommunityCommentsResponse extends PaginatedResponse<CommunityComment> {}

export interface CreateCommunityCommentBody {
  content: string
}

export interface CreateCommunityCommentResponse {
  id: number
  detail: string
}

export interface UpdateCommunityCommentBody {
  content: string
}

export interface UpdateCommunityCommentResponse {
  detail: string
}

export interface DeleteCommunityCommentResponse {
  detail: string
}