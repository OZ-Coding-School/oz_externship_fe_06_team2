// handlers.ts
import { http, HttpResponse } from 'msw'
import type {
  QnaListResponse,
  QnaDetailResponse,
  CategoriesResponse,
  CreateQnaPostResponse,
  QnaAnswerResponse,
  AiAnswerResponse,
} from '@/types'
import type { UserInfo } from '@/api/userInfo'
import type {
  CreateChatbotSessionResponse,
} from '@/api/chatbot'
import type { PresignedUrlResponse } from '@/api/qnaAnswersImages'

const BASE_URL = 'https://api.ozcodingschool.site/api/v1'

// ─────────────────────────────────────────────
// QnA 리스트
// ─────────────────────────────────────────────
const mockQnaList: QnaListResponse = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      id: 10501,
      category: { id: 12, depth: 2, names: ['백엔드', 'Django', 'ORM'] },
      author: {
        id: 211,
        nickname: '한율_회장',
        profile_image_url: 'https://cdn.ozcodingschool.com/profiles/user_123.png',
      },
      title: 'Django ORM 역참조는 어떻게 사용하나요?',
      content_preview:
        'ForeignKey에 related_name을 지정하면 역참조 시 해당 이름으로 접근할 수 있습니다.',
      answer_count: 3,
      view_count: 87,
      created_at: '2025-03-01 10:03:21',
      thumbnail_img_url: 'https://cdn.ozcodingschool.com/qna/thumb_10501_01.png',
    },
    {
      id: 10532,
      category: { id: 12, depth: 2, names: ['백엔드', 'Django', 'ORM'] },
      author: { id: 211, nickname: '한율_회장', profile_image_url: null },
      title: 'select_related vs prefetch_related 차이가 뭔가요?',
      content_preview:
        'select_related는 JOIN을 사용하고, prefetch_related는 별도 쿼리를 사용합니다.',
      answer_count: 1,
      view_count: 42,
      created_at: '2025-03-05 09:10:00',
      thumbnail_img_url: null,
    },
  ],
}

// ─────────────────────────────────────────────
// QnA 상세
// ─────────────────────────────────────────────
const mockQnaDetail: QnaDetailResponse = {
  id: 10501,
  title: 'Django에서 ForeignKey 역참조는 어떻게 하나요?',
  content: 'Django 모델에서 related_name을 지정했을 때 역참조를 어떻게 사용하는지 궁금합니다.',
  category: { id: 12, depth: 2, names: ['백엔드', 'Django', 'ORM'] },
  images: [
    { id: 3, img_url: 'https://cdn.ozcodingschool.com/qna/img_20250301_101530.png' },
  ],
  view_count: 88,
  created_at: '2026-01-20 10:25:33',
  author: { id: 211, nickname: '한솔_회장', profile_image_url: null },
  answers: [
    {
      id: 501,
      content: 'related_name을 지정하면 역참조 시 해당 이름으로 접근할 수 있습니다. `post.comments.all()` 형태로 사용합니다.',
      created_at: '2026-01-20 11:30:00',
      is_adopted: true,
      author: {
        id: 102,
        nickname: 'django_master',
        profile_image_url: 'https://cdn.ozcodingschool.com/profile/user102.png',
      },
      comments: [
        {
          id: 1001,
          content: '답변 감사합니다! 덕분에 이해됐어요.',
          created_at: '2026-01-20 12:00:00',
          author: { id: 211, nickname: '한솔_회장', profile_image_url: null },
        },
        {
          id: 1002,
          content: '추가로 prefetch_related도 같이 쓰시면 좋아요.',
          created_at: '2025-03-01 12:15:00',
          author: {
            id: 102,
            nickname: 'django_master',
            profile_image_url: 'https://cdn.ozcodingschool.com/profile/user102.png',
          },
        },
      ],
    },
    {
      id: 502,
      content: 'select_related와 prefetch_related 차이도 알아두시면 좋습니다.',
      created_at: '2025-03-01 14:00:00',
      is_adopted: false,
      author: { id: 305, nickname: 'orm_lover', profile_image_url: null },
      comments: [],
    },
  ],
}

// ─────────────────────────────────────────────
// 카테고리
// ─────────────────────────────────────────────
const mockCategories: CategoriesResponse = {
  categories: [
    {
      id: 1,
      name: '프론트엔드',
      depth: 0,
      subcategories: [
        {
          id: 2,
          name: 'React',
          depth: 1,
          subcategories: [
            { id: 3, name: 'Hooks', depth: 2, subcategories: [] },
            { id: 4, name: 'State 관리', depth: 2, subcategories: [] },
          ],
        },
        {
          id: 5,
          name: 'TypeScript',
          depth: 1,
          subcategories: [
            { id: 6, name: '타입 시스템', depth: 2, subcategories: [] },
          ],
        },
      ],
    },
    {
      id: 7,
      name: '백엔드',
      depth: 0,
      subcategories: [
        {
          id: 8,
          name: 'Django',
          depth: 1,
          subcategories: [
            { id: 9, name: 'ORM', depth: 2, subcategories: [] },
            { id: 10, name: 'REST API', depth: 2, subcategories: [] },
            { id: 12, name: 'ORM', depth: 2, subcategories: [] },
          ],
        },
      ],
    },
  ],
}

// ─────────────────────────────────────────────
// 유저 정보
// ─────────────────────────────────────────────
const mockUserInfo: UserInfo = {
  id: 211,
  email: 'mock_user@ozcodingschool.com',
  nickname: '한솔_회장',
  profile_img_url: 'https://cdn.ozcodingschool.com/profiles/user_123.png',
}

// ─────────────────────────────────────────────
// Presigned URL
// ─────────────────────────────────────────────
const mockPresignedUrl: PresignedUrlResponse = {
  presigned_url: 'https://s3.amazonaws.com/mock-bucket/mock-key?AWSAccessKeyId=mock',
  img_url: 'https://cdn.ozcodingschool.com/qna/mock-upload.png',
  key: 'qna/mock-upload.png',
}

// ─────────────────────────────────────────────
// 챗봇
// ─────────────────────────────────────────────
let chatbotSessionId = 1

const mockChatbotSession: CreateChatbotSessionResponse = {
  id: chatbotSessionId,
  session_id: chatbotSessionId,
  user_id: 211,
  title: '새 챗봇 세션',
  using_model: 'gpt-4o',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const handlers = [
  // ────────────────────────────────────────────
  // 토큰 갱신 (앱 초기화 시 App.tsx에서 호출)
  // ────────────────────────────────────────────
  http.post(`${BASE_URL}/accounts/me/refresh/`, () => {
    console.log('[MSW] 토큰 갱신 요청')
    return HttpResponse.json({
      access_token: 'mock-access-token-12345',
    })
  }),

  // ────────────────────────────────────────────
  // QnA 리스트 GET
  // ────────────────────────────────────────────
  http.get(`${BASE_URL}/qna/questions`, () => {
    return HttpResponse.json(mockQnaList)
  }),

  // ────────────────────────────────────────────
  // QnA 게시글 생성 POST
  // ────────────────────────────────────────────
  http.post(`${BASE_URL}/qna/questions`, async ({ request }) => {
    const body = await request.json() as { title?: string; content?: string; category_id?: number }
    console.log('[MSW] QnA 게시글 생성:', body)
    const response: CreateQnaPostResponse = { question_id: 99999 }
    return HttpResponse.json(response, { status: 201 })
  }),

  // ────────────────────────────────────────────
  // QnA 질문 Presigned URL PUT
  // ────────────────────────────────────────────
  http.put(`${BASE_URL}/qna/questions/presigned-url`, async ({ request }) => {
    const body = await request.json() as { file_name?: string }
    console.log('[MSW] 질문 이미지 Presigned URL 요청:', body)
    return HttpResponse.json(mockPresignedUrl)
  }),

  // ────────────────────────────────────────────
  // QnA 상세 GET  ← /questions/:id 전에 /questions/presigned-url 등록 필요
  // ────────────────────────────────────────────
  http.get(`${BASE_URL}/qna/questions/:id`, ({ params }) => {
    console.log('[MSW] QnA 상세 조회 - id:', params.id)
    return HttpResponse.json({ ...mockQnaDetail, id: Number(params.id) })
  }),

  // ────────────────────────────────────────────
  // QnA 질문 수정 PUT
  // ────────────────────────────────────────────
  http.put(`${BASE_URL}/qna/questions/:id`, async ({ params, request }) => {
    const body = await request.json() as { title?: string; content?: string; category_id?: number }
    console.log('[MSW] QnA 수정 - id:', params.id, body)
    return HttpResponse.json({ ...mockQnaDetail, id: Number(params.id), ...body })
  }),

  // ────────────────────────────────────────────
  // QnA AI 답변 GET
  // ────────────────────────────────────────────
  http.get(`${BASE_URL}/qna/questions/:id/ai-answer`, ({ params }) => {
    const aiResponse: AiAnswerResponse = {
      id: 1,
      question_id: Number(params.id),
      output:
        'Django ORM에서 역참조는 related_name 속성을 통해 지정할 수 있습니다. 예를 들어, ForeignKey(User, related_name="posts")로 정의하면 user.posts.all()로 접근 가능합니다.',
      using_model: 'gpt-4o',
      created_at: new Date().toISOString(),
    }
    return HttpResponse.json(aiResponse)
  }),

  // ────────────────────────────────────────────
  // QnA 답변 작성 POST
  // ────────────────────────────────────────────
  http.post(`${BASE_URL}/qna/questions/:id/answers`, async ({ params, request }) => {
    const body = await request.json() as { content?: string; image_urls?: string[] }
    console.log('[MSW] 답변 작성 - questionId:', params.id, body)
    const response: QnaAnswerResponse = { question_id: Number(params.id) }
    return HttpResponse.json(response, { status: 201 })
  }),

  // ────────────────────────────────────────────
  // QnA 카테고리 GET
  // ────────────────────────────────────────────
  http.get(`${BASE_URL}/qna/categories`, () => {
    return HttpResponse.json(mockCategories)
  }),

  // ────────────────────────────────────────────
  // QnA 답변 Presigned URL PUT
  // ────────────────────────────────────────────
  http.put(`${BASE_URL}/qna/answers/presigned-url`, async ({ request }) => {
    const body = await request.json() as { file_name?: string }
    console.log('[MSW] 답변 이미지 Presigned URL 요청:', body)
    return HttpResponse.json(mockPresignedUrl)
  }),

  // ────────────────────────────────────────────
  // QnA 답변 수정 PUT
  // ────────────────────────────────────────────
  http.put(`${BASE_URL}/qna/answers/:answerId`, async ({ params, request }) => {
    const body = await request.json() as { content?: string; image_urls?: string[] }
    console.log('[MSW] 답변 수정 - answerId:', params.answerId, body)
    return HttpResponse.json({ id: Number(params.answerId), ...body })
  }),

  // ────────────────────────────────────────────
  // QnA 답변 채택 POST
  // ────────────────────────────────────────────
  http.post(`${BASE_URL}/qna/answers/:answerId/accept`, ({ params }) => {
    console.log('[MSW] 답변 채택 - answerId:', params.answerId)
    return HttpResponse.json({ message: '채택 완료' })
  }),

  // ────────────────────────────────────────────
  // QnA 댓글 작성 POST
  // ────────────────────────────────────────────
  http.post(`${BASE_URL}/qna/answers/:answerId/comments`, async ({ params, request }) => {
    const body = await request.json() as { content?: string }
    console.log('[MSW] 댓글 작성 - answerId:', params.answerId, body)
    return HttpResponse.json(
      {
        id: Math.floor(Math.random() * 9000) + 1000,
        content: body.content ?? '',
        created_at: new Date().toISOString(),
        author: mockUserInfo,
      },
      { status: 201 }
    )
  }),

  // ────────────────────────────────────────────
  // 유저 정보 GET
  // ────────────────────────────────────────────
  http.get(`${BASE_URL}/accounts/me/`, () => {
    return HttpResponse.json(mockUserInfo)
  }),

  // ────────────────────────────────────────────
  // 챗봇 세션 생성 POST
  // ────────────────────────────────────────────
  http.post(`${BASE_URL}/chatbot/sessions/`, async ({ request }) => {
    const body = await request.json() as { title?: string; using_model?: string }
    chatbotSessionId += 1
    const session: CreateChatbotSessionResponse = {
      ...mockChatbotSession,
      id: chatbotSessionId,
      session_id: chatbotSessionId,
      title: body.title ?? '새 챗봇 세션',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    console.log('[MSW] 챗봇 세션 생성:', session)
    return HttpResponse.json(session, { status: 201 })
  }),

  // ────────────────────────────────────────────
  // 챗봇 세션 삭제 DELETE
  // ────────────────────────────────────────────
  http.delete(`${BASE_URL}/chatbot/sessions/:sessionId/`, ({ params }) => {
    console.log('[MSW] 챗봇 세션 삭제 - sessionId:', params.sessionId)
    return new HttpResponse(null, { status: 204 })
  }),

  // ────────────────────────────────────────────
  // 챗봇 메시지 전송 POST
  // ────────────────────────────────────────────
  http.post(`${BASE_URL}/chatbot/sessions/:sessionId/completions`, async ({ params, request }) => {
    const body = await request.json() as { message?: string }
    console.log('[MSW] 챗봇 메시지 전송 - sessionId:', params.sessionId, '메시지:', body.message)

    // SSE 형식 시뮬레이션 (실제 앱이 SSE 파싱을 기대하므로)
    const replyText = `안녕하세요! "${body.message ?? ''}"에 대한 AI 답변입니다. MSW 모킹 응답입니다.`
    const sseBody = [
      `data: ${JSON.stringify({ content: replyText })}`,
      'data: [DONE]',
      '',
    ].join('\n')

    return new HttpResponse(sseBody, {
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' },
    })
  }),
]
