import { useState } from 'react'

interface TextAreaProps {
  onSubmit: (content: string) => void
  isPending?: boolean
}

export default function TextArea({ onSubmit, isPending }: TextAreaProps) {
  const [text, setText] = useState('')
  const isInputEmpty = text.trim().length === 0

  const handleSubmit = () => {
    if (!text.trim()) return
    onSubmit(text)
    setText('') // 제출 후 입력창 초기화
  }

  return (
    <div className="textarea_area">
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 입력하세요..."
      ></textarea>
      <button
        type="button"
        className="sm purple_line round absolute right-[20px] bottom-[20px]"
        disabled={isInputEmpty || isPending}
        onClick={handleSubmit}
      >
        {isPending ? '등록 중...' : '등록'}
      </button>
    </div>
  )
}
