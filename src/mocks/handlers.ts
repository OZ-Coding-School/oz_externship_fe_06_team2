// handlers.ts — 인메모리 DB 기반 MSW 핸들러
import { http, HttpResponse } from 'msw'
import type {
  QnaListResponse,
  QnaDetailResponse,
  CategoriesResponse,
  CreateQnaPostResponse,
  QnaAnswerResponse,
  AiAnswerResponse,
  QnaItem,
  QnaAnswer,
  QnaComment,
} from '@/types'

// ============================================================
// 인메모리 DB
// ============================================================

let nextQuestionId = 10600
let nextAnswerId = 600
let nextCommentId = 2000
let nextImageId = 100

const mockCategories: CategoriesResponse = {
  categories: [
    {
      id: 1,
      name: '프론트엔드',
      depth: 1,
      subcategories: [
        {
          id: 4,
          name: 'React',
          depth: 2,
          subcategories: [
            { id: 10, name: 'Hooks', depth: 3, subcategories: [] },
            { id: 11, name: 'State Management', depth: 3, subcategories: [] },
          ],
        },
        {
          id: 5,
          name: 'JavaScript',
          depth: 2,
          subcategories: [
            { id: 12, name: 'ES6+', depth: 3, subcategories: [] },
            { id: 13, name: 'DOM', depth: 3, subcategories: [] },
          ],
        },
        { id: 6, name: 'CSS', depth: 2, subcategories: [] },
      ],
    },
    {
      id: 2,
      name: '백엔드',
      depth: 1,
      subcategories: [
        {
          id: 7,
          name: 'Django',
          depth: 2,
          subcategories: [
            { id: 14, name: 'ORM', depth: 3, subcategories: [] },
            { id: 15, name: 'REST API', depth: 3, subcategories: [] },
          ],
        },
        { id: 8, name: 'Node.js', depth: 2, subcategories: [] },
      ],
    },
    {
      id: 3,
      name: '데이터베이스',
      depth: 1,
      subcategories: [
        { id: 9, name: 'SQL', depth: 2, subcategories: [] },
      ],
    },
  ],
}

// ─── 카테고리 ID → names 매핑 유틸 ─────────────────────────
function findCategoryNames(categoryId: number): { id: number; depth: number; names: string[] } {
  for (const main of mockCategories.categories) {
    if (main.id === categoryId) return { id: main.id, depth: 1, names: [main.name] }
    for (const sub of main.subcategories) {
      if (sub.id === categoryId) return { id: sub.id, depth: 2, names: [main.name, sub.name] }
      for (const detail of sub.subcategories) {
        if (detail.id === categoryId) return { id: detail.id, depth: 3, names: [main.name, sub.name, detail.name] }
      }
    }
  }
  return { id: categoryId, depth: 1, names: ['기타'] }
}

// ─── 질문 상세 저장소 ────────────────────────────────────
const questionsDB: Map<number, QnaDetailResponse> = new Map()

// 초기 데이터
const initialQuestions: QnaDetailResponse[] = [
  {
    id: 10501,
    title: 'Django ORM 역참조는 어떻게 사용하나요?',
    content: '<p>ForeignKey에 related_name을 지정하면 역참조 시 해당 이름으로 접근할 수 있다고 들었습니다.</p><p>구체적인 사용 방법이 궁금합니다.</p><pre><code>class Post(models.Model):\n    title = models.CharField(max_length=200)\n\nclass Comment(models.Model):\n    post = models.ForeignKey(Post, related_name="comments")\n    content = models.TextField()</code></pre>',
    category: { id: 14, depth: 3, names: ['백엔드', 'Django', 'ORM'] },
    images: [],
    view_count: 87,
    created_at: '2026-01-20 10:03:21',
    author: { id: 211, nickname: '한율_회장', profile_image_url: null },
    answers: [
      {
        id: 501,
        content: '`related_name`을 지정하면 역참조 시 해당 이름으로 접근할 수 있습니다.\n\n```python\npost = Post.objects.get(id=1)\npost.comments.all()  # 역참조\n```\n\n`prefetch_related`도 같이 쓰시면 성능 개선에 도움이 됩니다.',
        created_at: '2026-01-20 11:30:00',
        is_adopted: true,
        author: { id: 102, nickname: 'django_master', profile_image_url: null },
        comments: [
          { id: 1001, content: '답변 감사합니다! 덕분에 이해됐어요.', created_at: '2026-01-20 12:00:00', author: { id: 211, nickname: '한율_회장', profile_image_url: null } },
          { id: 1002, content: '추가로 prefetch_related도 같이 쓰시면 좋아요.', created_at: '2026-01-20 12:15:00', author: { id: 102, nickname: 'django_master', profile_image_url: null } },
        ],
      },
      {
        id: 502,
        content: '`select_related`와 `prefetch_related` 차이도 알아두시면 좋습니다.\n\n- `select_related`: ForeignKey, OneToOneField (SQL JOIN)\n- `prefetch_related`: ManyToManyField, 역방향 ForeignKey (별도 쿼리)',
        created_at: '2026-01-21 14:00:00',
        is_adopted: false,
        author: { id: 305, nickname: 'orm_lover', profile_image_url: null },
        comments: [
          { id: 1003, content: '정리가 깔끔하네요!', created_at: '2026-01-21 15:00:00', author: { id: 211, nickname: '한율_회장', profile_image_url: null } },
        ],
      },
    ],
  },
  {
    id: 10502,
    title: 'useEffect에서 cleanup 함수는 언제 사용하나요?',
    content: '<p>useEffect의 cleanup 함수가 정확히 언제 호출되는지 이해가 잘 안됩니다.</p><p>컴포넌트가 언마운트될 때만 호출되나요? 아니면 다른 경우에도 호출되나요?</p>',
    category: { id: 10, depth: 3, names: ['프론트엔드', 'React', 'Hooks'] },
    images: [],
    view_count: 152,
    created_at: '2026-01-22 14:30:00',
    author: { id: 102, nickname: 'react_lover', profile_image_url: null },
    answers: [
      {
        id: 503,
        content: 'cleanup 함수는 두 가지 경우에 호출됩니다:\n\n1. **컴포넌트 언마운트** 시\n2. **의존성 배열의 값이 변경**되어 effect가 다시 실행되기 전\n\n```jsx\nuseEffect(() => {\n  const timer = setInterval(() => console.log("tick"), 1000);\n  return () => clearInterval(timer); // cleanup\n}, []);\n```',
        created_at: '2026-01-22 15:00:00',
        is_adopted: false,
        author: { id: 305, nickname: 'orm_lover', profile_image_url: null },
        comments: [],
      },
    ],
  },
  {
    id: 10503,
    title: 'Promise와 async/await의 차이점은 무엇인가요?',
    content: '<p>JavaScript에서 비동기 처리를 할 때 Promise와 async/await 중 어떤 것을 사용해야 할지 헷갈립니다.</p><p>각각의 장단점과 사용 시기를 알려주세요.</p>',
    category: { id: 12, depth: 3, names: ['프론트엔드', 'JavaScript', 'ES6+'] },
    images: [],
    view_count: 203,
    created_at: '2026-02-01 09:15:00',
    author: { id: 305, nickname: 'js_master', profile_image_url: null },
    answers: [
      {
        id: 504,
        content: '`async/await`는 Promise 기반의 **문법적 설탕(syntactic sugar)**입니다.\n\n**Promise 체이닝:**\n```js\nfetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));\n```\n\n**async/await:**\n```js\ntry {\n  const res = await fetch(url);\n  const data = await res.json();\n  console.log(data);\n} catch (err) {\n  console.error(err);\n}\n```\n\nasync/await이 더 읽기 쉽습니다.',
        created_at: '2026-02-01 10:00:00',
        is_adopted: true,
        author: { id: 102, nickname: 'react_lover', profile_image_url: null },
        comments: [],
      },
    ],
  },
  {
    id: 10504,
    title: 'Zustand vs Redux, 어떤 상태관리 라이브러리를 선택해야 할까요?',
    content: '<p>새 프로젝트를 시작하면서 상태관리 라이브러리를 선택해야 합니다.</p><p>Zustand와 Redux 중 어떤 것이 더 적합할까요?</p>',
    category: { id: 11, depth: 3, names: ['프론트엔드', 'React', 'State Management'] },
    images: [],
    view_count: 178,
    created_at: '2026-02-05 16:45:00',
    author: { id: 1, nickname: 'TestUser', profile_image_url: null },
    answers: [],
  },
  {
    id: 10505,
    title: 'Flexbox와 Grid Layout의 차이점은?',
    content: '<p>CSS 레이아웃을 잡을 때 Flexbox와 Grid 중 어떤 것을 사용해야 할지 모르겠습니다.</p>',
    category: { id: 6, depth: 2, names: ['프론트엔드', 'CSS'] },
    images: [],
    view_count: 95,
    created_at: '2026-02-10 11:00:00',
    author: { id: 211, nickname: '한율_회장', profile_image_url: null },
    answers: [],
  },
  {
    id: 10506,
    title: 'Django REST Framework에서 Serializer 사용법?',
    content: '<p>DRF에서 Serializer를 제대로 사용하는 방법이 궁금합니다.</p><p>ModelSerializer와 일반 Serializer의 차이점도 알고 싶습니다.</p>',
    category: { id: 15, depth: 3, names: ['백엔드', 'Django', 'REST API'] },
    images: [],
    view_count: 134,
    created_at: '2026-02-15 08:30:00',
    author: { id: 102, nickname: 'react_lover', profile_image_url: null },
    answers: [],
  },
]

// DB 초기화
initialQuestions.forEach((q) => questionsDB.set(q.id, q))

// ─── 질문 → 리스트 아이템 변환 ────────────────────────
function toListItem(q: QnaDetailResponse): QnaItem {
  return {
    id: q.id,
    category: q.category,
    author: q.author,
    title: q.title,
    content_preview: q.content.replace(/<[^>]*>/g, '').slice(0, 200),
    answer_count: q.answers.length,
    view_count: q.view_count,
    created_at: q.created_at,
    thumbnail_img_url: null,
  }
}

// ============================================================
// Handlers
// ============================================================

export const handlers = [
  // ─── 인증 ────────────────────────────────────────────
  http.post('*/api/v1/accounts/me/refresh/', () => {
    return HttpResponse.json({
      access_token: 'mock-access-token-123',
      refresh_token: 'mock-refresh-token-456',
    })
  }),

  http.get('*/api/v1/accounts/me/', () => {
    return HttpResponse.json({
      id: 1,
      email: 'test@example.com',
      nickname: 'TestUser',
      name: 'Test Name',
      profile_image_url: null,
      profile_img_url: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    })
  }),

  // ─── 카테고리 ────────────────────────────────────────
  http.get('*/api/v1/qna/categories', () => {
    return HttpResponse.json(mockCategories)
  }),

  // ─── QnA 리스트 ──────────────────────────────────────
  http.get('*/api/v1/qna/questions', ({ request }) => {
    const url = new URL(request.url)
    const searchKeyword = url.searchParams.get('search_keyword')
    const answerStatus = url.searchParams.get('answer_status')
    const sort = url.searchParams.get('sort')
    const page = Number(url.searchParams.get('page') || '1')
    const size = Number(url.searchParams.get('size') || '10')

    let items = Array.from(questionsDB.values()).map(toListItem)

    // 검색
    if (searchKeyword) {
      const kw = searchKeyword.toLowerCase()
      items = items.filter(
        (i) => i.title.toLowerCase().includes(kw) || i.content_preview.toLowerCase().includes(kw)
      )
    }

    // 답변 상태
    if (answerStatus === 'answered') items = items.filter((i) => i.answer_count > 0)
    else if (answerStatus === 'waiting') items = items.filter((i) => i.answer_count === 0)

    // 정렬
    if (sort === 'oldest') {
      items.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } else {
      items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }

    // 페이지네이션
    const startIdx = (page - 1) * size
    const paginated = items.slice(startIdx, startIdx + size)

    const data: QnaListResponse = {
      count: items.length,
      next: startIdx + size < items.length ? `page=${page + 1}` : null,
      previous: page > 1 ? `page=${page - 1}` : null,
      results: paginated,
    }
    return HttpResponse.json(data)
  }),

  // ─── QnA 상세 ────────────────────────────────────────
  http.get('*/api/v1/qna/questions/:id', ({ params }) => {
    const id = Number(params.id)
    if (isNaN(id)) return HttpResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const question = questionsDB.get(id)
    if (!question) return HttpResponse.json({ error: 'Not Found' }, { status: 404 })

    // 조회수 +1
    question.view_count++

    return HttpResponse.json(question)
  }),

  // ─── 질문 생성 ────────────────────────────────────────
  http.post('*/api/v1/qna/questions', async ({ request }) => {
    const body = (await request.json()) as { title: string; content: string; category_id: number }
    nextQuestionId++

    const category = findCategoryNames(body.category_id)

    const newQuestion: QnaDetailResponse = {
      id: nextQuestionId,
      title: body.title,
      content: body.content,
      category,
      author: { id: 1, nickname: 'TestUser', profile_image_url: null },
      images: [],
      view_count: 0,
      created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
      answers: [],
    }

    questionsDB.set(nextQuestionId, newQuestion)

    const response: CreateQnaPostResponse = { question_id: nextQuestionId }
    return HttpResponse.json(response, { status: 201 })
  }),

  // ─── 질문 수정 ────────────────────────────────────────
  http.put('*/api/v1/qna/questions/:id', async ({ params, request }) => {
    const id = Number(params.id)
    const body = (await request.json()) as { title: string; content: string; category_id: number }
    const question = questionsDB.get(id)
    if (!question) return HttpResponse.json({ error: 'Not Found' }, { status: 404 })

    question.title = body.title
    question.content = body.content
    question.category = findCategoryNames(body.category_id)

    return HttpResponse.json({ message: '질문이 수정되었습니다.' })
  }),

  // ─── 답변 작성 ────────────────────────────────────────
  http.post('*/api/v1/qna/questions/:id/answers', async ({ params, request }) => {
    const questionId = Number(params.id)
    const body = (await request.json()) as { content: string; image_urls: string[] }
    const question = questionsDB.get(questionId)
    if (!question) return HttpResponse.json({ error: 'Not Found' }, { status: 404 })

    nextAnswerId++
    const newAnswer: QnaAnswer = {
      id: nextAnswerId,
      content: body.content,
      created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
      is_adopted: false,
      author: { id: 1, nickname: 'TestUser', profile_image_url: null },
      comments: [],
    }

    question.answers.push(newAnswer)

    const response: QnaAnswerResponse = { question_id: questionId }
    return HttpResponse.json(response, { status: 201 })
  }),

  // ─── AI 답변 ─────────────────────────────────────────
  http.get('*/api/v1/qna/questions/:id/ai-answer', ({ params }) => {
    const questionId = Number(params.id)
    const question = questionsDB.get(questionId)

    const response: AiAnswerResponse = {
      id: 1,
      question_id: questionId,
      output: `## AI 답변\n\n${question ? `**"${question.title}"**에 대해 답변드립니다.\n\n` : ''}이 주제에 대해 핵심 내용을 정리해 드리겠습니다.\n\n### 핵심 개념\n1. **기본 원리**: 해당 기능은 프레임워크에서 제공하는 핵심 기능 중 하나입니다.\n2. **사용법**: 공식 문서를 참고하면 다양한 예제를 확인할 수 있습니다.\n\n### 코드 예시\n\n\`\`\`python\n# 예시 코드\ndef example():\n    return "Hello World"\n\`\`\`\n\n> 💡 **팁**: 공식 문서를 먼저 참고하시면 이해가 더 빠릅니다!\n\n더 자세한 내용이 궁금하시면 추가 질문해주세요. 🤖`,
      using_model: 'Gemini',
      created_at: new Date().toISOString(),
    }
    return HttpResponse.json(response)
  }),

  // ─── 답변 수정 ────────────────────────────────────────
  http.put('*/api/v1/qna/answers/:id', async ({ params, request }) => {
    const answerId = Number(params.id)
    const body = (await request.json()) as { content: string; image_urls: string[] }

    // 모든 질문에서 해당 답변 찾아 수정
    for (const question of questionsDB.values()) {
      const answer = question.answers.find((a) => a.id === answerId)
      if (answer) {
        answer.content = body.content
        return HttpResponse.json({ message: '답변이 수정되었습니다.' })
      }
    }

    return HttpResponse.json({ error: 'Not Found' }, { status: 404 })
  }),

  // ─── 답변 채택 ────────────────────────────────────────
  http.post('*/api/v1/qna/answers/:id/accept', ({ params }) => {
    const answerId = Number(params.id)

    for (const question of questionsDB.values()) {
      const answer = question.answers.find((a) => a.id === answerId)
      if (answer) {
        // 기존 채택 제거
        question.answers.forEach((a) => (a.is_adopted = false))
        // 새로 채택
        answer.is_adopted = true
        return HttpResponse.json({ message: '답변이 채택되었습니다.' })
      }
    }

    return HttpResponse.json({ error: 'Not Found' }, { status: 404 })
  }),

  // ─── 댓글 작성 ────────────────────────────────────────
  http.post('*/api/v1/qna/answers/:id/comments', async ({ params, request }) => {
    const answerId = Number(params.id)
    const body = (await request.json()) as { content: string }

    for (const question of questionsDB.values()) {
      const answer = question.answers.find((a) => a.id === answerId)
      if (answer) {
        nextCommentId++
        const newComment: QnaComment = {
          id: nextCommentId,
          content: body.content,
          created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
          author: { id: 1, nickname: 'TestUser', profile_image_url: null },
        }
        answer.comments.push(newComment)
        return HttpResponse.json(newComment, { status: 201 })
      }
    }

    return HttpResponse.json({ error: 'Not Found' }, { status: 404 })
  }),

  // ─── 이미지 Presigned URL (질문용) ─────────────────────
  http.put('*/api/v1/qna/questions/presigned-url', async ({ request }) => {
    const body = (await request.json()) as { file_name: string }
    nextImageId++
    return HttpResponse.json({
      presigned_url: `https://mock-s3.example.com/upload/${nextImageId}`,
      img_url: `https://mock-s3.example.com/images/${body.file_name}`,
      key: `qna/images/${nextImageId}_${body.file_name}`,
    })
  }),

  // ─── 이미지 Presigned URL (답변용) ─────────────────────
  http.put('*/api/v1/qna/answers/presigned-url', async ({ request }) => {
    const body = (await request.json()) as { file_name: string }
    nextImageId++
    return HttpResponse.json({
      presigned_url: `https://mock-s3.example.com/upload/${nextImageId}`,
      img_url: `https://mock-s3.example.com/images/${body.file_name}`,
      key: `qna/answers/images/${nextImageId}_${body.file_name}`,
    })
  }),

  // ─── S3 업로드 모킹 ───────────────────────────────────
  http.put('https://mock-s3.example.com/*', () => {
    return new HttpResponse(null, { status: 200 })
  }),

  // ─── 챗봇 세션 생성 ───────────────────────────────────
  http.post('*/api/v1/chatbot/sessions/', async () => {
    return HttpResponse.json({
      id: 1001,
      session_id: 1001,
      user_id: 1,
      question: '1',
      title: '새 대화',
      using_model: 'Gemini',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }),

  // ─── 챗봇 세션 삭제 ───────────────────────────────────
  http.delete('*/api/v1/chatbot/sessions/:id/', () => {
    return new HttpResponse(null, { status: 204 })
  }),

  // ─── 챗봇 메시지 전송 ─────────────────────────────────
  http.post('*/api/v1/chatbot/sessions/:id/completions', async () => {
    const chunks = [
      'data: {"content":"안녕하세요! "}\n\n',
      'data: {"content":"질문에 대해 "}\n\n',
      'data: {"content":"답변드리겠습니다.\\n\\n"}\n\n',
      'data: {"content":"해당 내용은 공식 문서를 참고하시면 "}\n\n',
      'data: {"content":"더 자세한 정보를 얻으실 수 있습니다. "}\n\n',
      'data: {"content":"추가로 궁금한 점이 있으시면 "}\n\n',
      'data: {"content":"언제든 질문해주세요! 🤖"}\n\n',
      'data: [DONE]\n\n',
    ]
    return new HttpResponse(chunks.join(''), {
      headers: { 'Content-Type': 'text/event-stream' },
    })
  }),
]
