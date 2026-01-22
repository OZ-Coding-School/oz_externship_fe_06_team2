import Button from '@/components/common/Button'
import { useState } from 'react'
export default function TextArea() {
  const [text, setText] = useState('')
  const isInputEmpty = text.trim().length === 0
  return (
    <div className="textarea_area">
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <Button
        className="absolute right-[20px] bottom-[20px]"
        size="sm"
        style="purple_line round"
        disabled={isInputEmpty}
      >
        등록
      </Button>
    </div>
  )
}
