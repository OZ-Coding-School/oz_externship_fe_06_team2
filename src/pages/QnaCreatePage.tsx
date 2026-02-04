import { useState } from 'react'
import { useNavigate } from 'react-router'

import { getAccessToken } from '../api/api'
import { createQnaPost } from '@/hooks/FetchQnaCreate'
import CategorySelect from '../components/common/CategorySelect'
import Editor from '../components/Editor/Editor'

export default function CommunityCreatePage() {
  const navigate = useNavigate()

  // --- Data ---
  const [mainCategoryId, setMainCategoryId] = useState<number | null>(null)
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null)
  const [detailCategoryId, setDetailCategoryId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (mainCategoryId === null) {
      alert('대분류를 선택해주세요.')
      return
    }
    // if (subCategoryId === null) {
    //   alert('중분류를 선택해주세요.')
    //   return
    // }
    // if (detailCategoryId === null) {
    //   alert('소분류를 선택해주세요.')
    //   return
    // }
    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    try {
      setIsLoading(true)
      const token = getAccessToken()
      const params = {
        title,
        content,
        category_id: detailCategoryId || subCategoryId || mainCategoryId,
      }
      const data = await createQnaPost(params, token ?? '')
      console.log(params)
      alert('게시글이 등록되었습니다.')
      navigate(`/community/${data.pk}`)
    } catch (error) {
      console.log(
        '등록파람스테스트:',
        '대분류',
        mainCategoryId,
        '중분류',
        subCategoryId,
        '소분류',
        detailCategoryId,
        '제목',
        title,
        '내용',
        content
      )
      console.error('게시글 등록 실패:', error)
      alert('게시글 등록에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-[944px] flex-col items-end gap-[52px]">
        {/* 헤더 */}
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-10">
            <div className="flex w-full flex-col items-start gap-5">
              <h1 className="font-['Pretendard'] text-[32px] font-bold tracking-[-0.64px] text-[#111111]">
                질문 작성하기
              </h1>
              <div className="h-px w-full bg-[#E5E7EB]" />
            </div>

            <div className="flex w-full flex-col items-start gap-2.5 rounded-[20px] border border-[#E5E7EB] px-[38px] py-10">
              <div className="flex w-full flex-col items-start gap-5">
                {/* 3개의 Category Select */}
                <CategorySelect
                  mainCategoryId={mainCategoryId}
                  subCategoryId={subCategoryId}
                  detailCategoryId={detailCategoryId}
                  onMainCategoryChange={setMainCategoryId}
                  onSubCategoryChange={setSubCategoryId}
                  onDetailCategoryChange={setDetailCategoryId}
                  viewMode="row"
                />

                {/* 제목 */}
                <div className="bg-primary-50 flex h-[60px] w-full items-center rounded px-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력해 주세요"
                    className="w-full bg-transparent text-lg font-medium text-[#111827] outline-none placeholder:text-[#9CA3AF]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 에디터 */}
        <div className="flex w-full flex-col items-end gap-[52px]">
          <Editor value={content} onChange={setContent} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="rounded bg-[#7C3AED] px-10 py-3 text-base font-bold text-white transition-colors hover:bg-[#6D28D9] disabled:bg-gray-400"
        >
          {isLoading ? '등록 중...' : '등록하기'}
        </button>
      </div>
    </div>
  )
}
