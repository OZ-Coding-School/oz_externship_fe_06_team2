import { Link } from 'react-router'
import { useAuthStore } from '@/store'
// src/components/layout/Header.tsx
export default function Header() {
  const accessToken = useAuthStore((state) => state.accessToken)
  const userInfo = useAuthStore((state) => state.userInfo)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  return (
    <header className="w-full">
      {/* 상단 알림 바 */}
      <div className="w-full bg-[#222222] text-center text-sm text-white">
        <div className="mx-auto max-w-[1200px] py-2 font-[Pretendard]">
          🚨 선착순 모집! 국비지원 받고 4주 완성
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
          {/* 왼쪽: 로고 + 메뉴 */}
          <div className="flex items-center gap-10">
            {/* 로고 */}
            <a href="/" className="flex items-center">
              <svg
                width="150"
                height="20"
                viewBox="0 0 150 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="block"
              >
                <rect
                  width="149.677"
                  height="20"
                  fill="url(#pattern0_91_5521)"
                />
                <defs>
                  <pattern
                    id="pattern0_91_5521"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_91_5521"
                      transform="scale(0.00215517 0.016129)"
                    />
                  </pattern>
                  <image
                    id="image0_91_5521"
                    width="464"
                    height="62"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </a>

            {/* 메뉴 */}
            <nav className="flex gap-10 font-[Pretendard] text-[18px] text-gray-700">
              <a
                href="https://community.ozcodingschool.site/"
                className="transition-colors duration-200 hover:text-black"
              >
                커뮤니티
              </a>
              <Link
                to="https://qna.ozcodingschool.site/"
                className="transition-colors duration-200 hover:text-black"
              >
                질의응답
              </Link>
            </nav>
          </div>

          {/* 오른쪽 메뉴 */}
          {accessToken ? (
            <div className="flex items-center gap-2 font-[Pretendard] text-gray-500">
              <span className="text-gray-700">
                {userInfo?.nickname || '사용자'}님
              </span>
              <a
                href="https://my.ozcodingschool.site/mypage/profile"
                className="transition-colors duration-200 hover:text-gray-900"
                onClick={(e) => {
                  e.preventDefault()
                  clearAuth()
                }}
              >
                로그아웃
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-[Pretendard] text-gray-500">
              <a
                href="https://my.ozcodingschool.site/login"
                className="transition-colors duration-200 hover:text-gray-900"
              >
                로그인
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://my.ozcodingschool.site/signup"
                className="transition-colors duration-200 hover:text-gray-900"
              >
                회원가입
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
