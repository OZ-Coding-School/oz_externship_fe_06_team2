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
      answers: [
        {
          id: 501,
          content:
            'related_name을 지정하면 역참조 시 해당 이름으로 접근할 수 있습니다. 예를 들어 `post.comments.all()` 형태로 사용합니다.',
          created_at: '2025-03-01 11:30:00',
          is_adopted: true,
          author: {
            id: 102,
            nickname: 'django_master',
            profile_image_url:
              'https://cdn.ozcodingschool.com/profile/user102.png',
          },
          comments: [
            {
              id: 1001,
              content: '답변 감사합니다! 덕분에 이해됐어요.',
              created_at: '2025-03-01 12:00:00',
              author: {
                id: 211,
                nickname: '한솔_회장',
                profile_image_url: null,
              },
            },
            {
              id: 1002,
              content: '추가로 prefetch_related도 같이 쓰시면 좋아요.',
              created_at: '2025-03-01 12:15:00',
              author: {
                id: 102,
                nickname: 'django_master',
                profile_image_url:
                  'https://cdn.ozcodingschool.com/profile/user102.png',
              },
            },
          ],
        },
        {
          id: 502,
          content:
            'select_related와 prefetch_related 차이도 알아두시면 좋습니다.',
          created_at: '2025-03-01 14:00:00',
          is_adopted: false,
          author: {
            id: 305,
            nickname: 'orm_lover',
            profile_image_url: null,
          },
          comments: [],
        },
      ],
    }

    return HttpResponse.json(mockData)
  }),
]
