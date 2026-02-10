import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QnaAnswersModify } from '@/api/qnaAnswersModify'
import type { QnaAnswerBody } from '@/types'

export function useQnaAnswersModify(questionId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      answerId,
      body,
    }: {
      answerId: number
      body: QnaAnswerBody
    }) => QnaAnswersModify(answerId, body),
    onSuccess: () => {
      alert('답변이 수정되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['qnaDetails', questionId.toString()],
      })
    },
  })
}
