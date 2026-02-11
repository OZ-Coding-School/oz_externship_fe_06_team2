import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { QnaDetails } from '@/api/qnaDetails'
import { useQnaDetailsModify } from '@/hooks/useQnaDetailsModify'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { findCategoryPath } from '@/utils/categoryUtils'
import CategorySelect from '@/components/common/CategorySelect'
import Editor from '@/components/Editor/Editor'
import Loading from '@/components/common/Loading'
import Error from '@/pages/Error'

export default function QnaModifyPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // 기존 데이터 가져오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qnaDetails', id],
    queryFn: () => QnaDetails(Number(id)),
    enabled: !!id,
  })

  // 카테고리 데이터 가져오기
  const { data: categoryData } = useCategoryQuery()

  // --- Data ---
  const [mainCategoryId, setMainCategoryId] = useState<number | null>(null)
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null)
  const [detailCategoryId, setDetailCategoryId] = useState<number | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  // 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (data && categoryData) {
      setTitle(data.title)
      setContent(data.content)

      // 카테고리 경로 찾기
      const categoryPath = findCategoryPath(
        categoryData.categories,
        data.category.id
      )

      if (categoryPath) {
        setMainCategoryId(categoryPath.mainId)
        setSubCategoryId(categoryPath.subId)
        setDetailCategoryId(categoryPath.detailId)
      }
    }
  }, [data, categoryData])

  const { mutate: modifyQuestion, isPending } = useQnaDetailsModify(Number(id))

  const handleSubmit = async () => {
    if (mainCategoryId === null) {
      alert('대분류를 선택해주세요.')
      return
    }
    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.')
      return
    }

    const params = {
      title,
      content,
      category_id: detailCategoryId || subCategoryId || mainCategoryId,
    }

    modifyQuestion(params, {
      onSuccess: () => {
        navigate(`/qnadetails/${id}`)
      },
    })
  }

  if (isLoading) return <Loading />
  if (isError || !data) return <Error />

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-[944px] flex-col items-end gap-[52px]">
        {/* 헤더 */}
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex w-full flex-col items-start gap-10">
            <div className="flex w-full flex-col items-start gap-5">
              <h1 className="font-['Pretendard'] text-[32px] font-bold tracking-[-0.64px] text-[#111111]">
                질문 수정하기
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
          <Editor value={content} onChange={setContent} uploadType="question" />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/qnadetails/${id}`)}
            className="rounded bg-gray-400 px-10 py-3 text-base font-bold text-white transition-colors hover:bg-gray-500"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded bg-[#7C3AED] px-10 py-3 text-base font-bold text-white transition-colors hover:bg-[#6D28D9] disabled:bg-gray-400"
          >
            {isPending ? '수정 중...' : '수정하기'}
          </button>
        </div>
      </div>
    </div>
  )
}
