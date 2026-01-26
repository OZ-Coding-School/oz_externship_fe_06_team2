import { useEffect } from 'react'
import CloseIcon from '@/assets/images/svg/Close.svg?react'
import ResetIcon from '@/assets/images/svg/Reset.svg?react'
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  size?: 'sm' | 'lg'
  title?: string
  children: React.ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  size = 'sm',
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-[428px]', // 428px
    lg: 'max-w-[580px]', // 580px
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 딤드 배경 */}
      <div className="modal_dimmed" onClick={onClose} />

      {/* 모달 컨텐츠 박스 */}
      <div className={`modal_container ${sizeClasses[size]}`}>
        {/* 헤더 영역 */}
        <div className="modal_header">
          <h3 className="modal_title">{title}</h3>
          <button onClick={onClose} className="modal_close">
            <CloseIcon />
          </button>
        </div>

        {/* 본문 영역 */}
        <div className="modal_content">{children}</div>
        {/* 푸터 영역 */}
        <div className="modal_footer">
          <div className="btn_wrap flex-center-center w-full gap-[44px]">
            <button type="button" className="icon_button text">
              <ResetIcon /> 선택초기화
            </button>
            <button type="button" className="purple_bg w-[278px]">
              필터 적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
