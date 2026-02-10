import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QnaDetailsModify } from '@/api/qnaDetailsModify'

interface QnaModifyBody {
  title: string
  content: string
  category_id: number
}

export function useQnaDetailsModify(questionId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: QnaModifyBody) => QnaDetailsModify(questionId, body),
    onSuccess: () => {
      alert('질문이 수정되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['qnaDetails', questionId.toString()],
      })
    },
    onError: (error) => {
      console.error('질문 수정 실패:', error)
      alert('질문 수정에 실패했습니다.')
    },
  })
}
