import { useMutation, useQueryClient } from '@tanstack/react-query'
import { qnaAnswersAccept } from '@/api/qnaAnswersAccept'

export function useQnaAnswersAccept(questionId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (answerId: number) => qnaAnswersAccept(answerId),
    onSuccess: () => {
      alert('답변이 채택되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['qnaDetails', questionId.toString()],
      })
    },
  })
}
