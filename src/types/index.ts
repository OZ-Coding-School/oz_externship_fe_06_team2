// QnA 카테고리 정보 (대/중/소분류)
export interface QnaCategory {
  id: number
  depth: number
  names: string[]
}

//QnA 카테고리 api 응답
export interface Category {
  id: number
  name: string
  depth: number
  subcategories: Category[]
}

export interface CategoriesResponse {
  categories: Category[]
}

// 작성자 정보
export interface QnaAuthor {
  id: number
  nickname: string
  profile_image_url: string | null
}

// QnA 리스트
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

// QnA 리스트 API 응답
export interface QnaListResponse {
  count: number
  next: string | null
  previous: string | null
  results: QnaItem[]
}

// QnA 이미지 정보
export interface QnaImage {
  id: number
  img_url: string
}

// QnA 댓글 정보
export interface QnaComment {
  id: number
  content: string
  created_at: string
  author: QnaAuthor
}

// QnA 답변 정보
export interface QnaAnswer {
  question_id: number
  id: number
  content: string
  created_at: string
  is_adopted: boolean
  author: QnaAuthor
  comments: QnaComment[]
}

// QnA 상세 API 응답
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

// QnA 게시글 생성 요청 바디
export interface CreateQnaPostBody {
  title: string
  content: string
  category_id: number
}

// QnA 게시글 생성 응답
export interface CreateQnaPostResponse {
  question_id: number
}

//QnA 리스트 API 응답
export interface QnaListParams {
  search_keyword?: string
  answer_status?: string | null
  sort?: string
  category_id?: number | string | null
  page?: number
  size?: number
}

export interface QnaAnswerBody {
  content: string
  image_urls: string[]
}

export interface QnaAnswerResponse {
  question_id: number
}

export interface AiAnswerResponse {
  id: number
  question_id: number
  output: string
  using_model: string
  created_at: string
}
