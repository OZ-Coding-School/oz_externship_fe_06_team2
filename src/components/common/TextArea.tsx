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
      <button
        type="button"
        className="sm purple_line round absolute right-[20px] bottom-[20px]"
        disabled={isInputEmpty}
      >
        등록
      </button>
    </div>
  )
}
