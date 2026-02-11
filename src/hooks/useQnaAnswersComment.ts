import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QnaAnswersComment } from '@/api/qnaAnswersComment'

export function useQnaAnswersComment(questionId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      answerId,
      content,
    }: {
      answerId: number
      content: string
    }) => QnaAnswersComment(answerId, content),
    onSuccess: () => {
      alert('댓글이 등록되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['qnaDetails', questionId.toString()],
      })
    },
  })
}
