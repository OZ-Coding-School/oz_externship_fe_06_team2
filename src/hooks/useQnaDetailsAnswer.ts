import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QnaAnswer } from '@/api/qnaAnswers'
import type { QnaAnswerBody } from '@/types'

export function useQnaDetailsAnswer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ body, id }: { body: QnaAnswerBody; id: number }) =>
      QnaAnswer(body, id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['qnaDetails', variables.id.toString()],
      })
    },
  })
}
