// handlers.ts
import { http, HttpResponse } from 'msw'
import type { QnaListResponse, QnaDetailResponse } from '@/types'

export const handlers = [
  // QnA 리스트 API 모킹
  http.get('/api/qna', () => {
    const mockData: QnaListResponse = {
      count: 152,
      next: null,
      previous: null,
      results: [
        {
          id: 10501,
          category: {
            id: 12,
            depth: 2,
            names: ['백엔드', 'Django', 'ORM'],
          },
          author: {
            id: 211,
            nickname: '한율_회장',
            profile_image_url:
              'https://cdn.ozcodingschool.com/profiles/user_123.png',
          },
          title: 'Django ORM 역참조는 어떻게 사용하나요?',
          content_preview:
            'ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ',
          answer_count: 3,
          view_count: 87,
          created_at: '2025-03-01 10:03:21',
          thumbnail_img_url:
            'https://cdn.ozcodingschool.com/qna/thumb_10501_01.png',
        },
        {
          id: 10532,
          category: {
            id: 12,
            depth: 2,
            names: ['백엔드', 'Django', 'ORM'],
          },
          author: {
            id: 211,
            nickname: '한율_회장',
            profile_image_url: '',
          },
          title: 'Django ORM 역참조는 어떻게 사용하나요?',
          content_preview:
            'ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ForeignKey에 related_name을 지정하면 ',
          answer_count: 3,
          view_count: 87,
          created_at: '2025-03-01 10:03:21',
          thumbnail_img_url: '',
        },
      ],
    }

    return HttpResponse.json(mockData)
  }),
  // QnA 상세 API 모킹
  http.get('/api/qna/:id', () => {
    const mockData: QnaDetailResponse = {
      id: 10501,
      title: 'Django에서 ForeignKey 역참조는 어떻게 하나요?',
      content: 'Django 모델에서 related_name을 지정했을 때...',
      category: {
        id: 12,
        depth: 2,
        names: ['백엔드', 'Django', 'ORM'],
      },
      images: [
        {
          id: 3,
          img_url: 'https://cdn.ozcodingschool.com/qna/img_20250301_101530.png',
        },
      ],
      view_count: 88,
      created_at: '2025-03-01 10:25:33',
      author: {
        id: 211,
        nickname: '한솔_회장',
        profile_image_url: null,
      },
      answers: [],
    }

    return HttpResponse.json(mockData)
  }),
]
