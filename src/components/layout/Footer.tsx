// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-[#222222]">
      {/* 
        - 피그마: 바깥 1920 기준 / 안쪽 content 1200
        - 반응형: 1200은 유지하되, 작은 화면에서는 w-full + px만 줄이기
      */}
      <div className="mx-auto w-full max-w-[1920px] px-[20px] py-[80px] sm:px-[32px] md:px-[48px] lg:px-[80px] xl:px-[360px]">
        {/* content width = 1200 (큰 화면에선 정확히 1200, 작은 화면에선 꽉 차게) */}
        <div className="mx-auto w-full max-w-[1200px]">
          {/*
              TOP (logo + camp list)*/}
          <div className="w-full">
            {/* OZ logo*/}
            <div className="h-[24px] w-[159px]">
              <svg
                width="159"
                height="24"
                viewBox="0 0 159 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect
                  width="159"
                  height="23.7105"
                  fill="url(#pattern0_91_14382)"
                />
                <defs>
                  <pattern
                    id="pattern0_91_14382"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_91_14382"
                      transform="scale(0.00438596 0.0294118)"
                    />
                  </pattern>
                  <image
                    id="image0_91_14382"
                    width="228"
                    height="34"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                  />
                </defs>
              </svg>
            </div>

            {/* Camp list: 18px / 140% / -3% / #CECECE */}
            <ul className="font-pretendard mt-[24px] space-y-[16px] text-[18px] leading-[24px] font-[300] tracking-[-0.03em] text-[#CECECE]">
              <li>
                <a href="#" className="hover:text-white">
                  초격차캠프
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  사업개발캠프
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  프로젝트 디자이너 캠프
                </a>
              </li>
            </ul>
          </div>

          {/* ======================
              Divider + Policy + Company info
              ====================== */}
          <div className="mt-[40px] border-t border-[#707070] pt-[40px]">
            {/* Policy row: 원본은 1200 x 64, 반응형에서는 w-full로 */}
            <div className="flex min-h-[64px] w-full flex-col gap-[16px] sm:flex-row sm:items-center sm:justify-between">
              {/* 정책 링크: 16px / 140% / -3% / #CECECE, gap 28 */}
              <div className="font-pretendard flex flex-wrap items-center gap-x-[28px] gap-y-[10px] text-[16px] leading-[22.4px] font-[400] tracking-[-0.03em] text-[#CECECE]">
                <a href="#" className="hover:text-white">
                  개인정보처리방침
                </a>
                <a href="#" className="hover:text-white">
                  이용약관
                </a>
                <a href="#" className="hover:text-white">
                  멘토링&강사지원
                </a>
              </div>

              {/* Right icons: 132 x 24 */}
              <div className="flex h-[24px] w-[132px] items-center justify-start sm:justify-end">
                <svg
                  className="h-[24px] w-[132px]"
                  viewBox="0 0 132 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5482 4C7.83195 4 4 7.1 4 10.9C4 13.3 5.57208 15.4 7.83195 16.7L7.24242 20L10.8779 17.6C11.3691 17.7 11.9587 17.7 12.4499 17.7C17.1662 17.7 20.9981 14.6 20.9981 10.8C21.0964 7.1 17.2645 4 12.5482 4Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M41.7679 9.89258C41.5282 9.89258 41.3152 9.98703 41.1554 10.1624C40.9822 10.3379 40.9023 10.5537 40.9023 10.8101C40.9023 11.0665 40.9822 11.2689 41.1554 11.4578C41.3285 11.6332 41.5282 11.7277 41.7679 11.7277C42.0076 11.7277 42.2207 11.6332 42.3938 11.4578C42.567 11.2824 42.6602 11.0665 42.6602 10.8101C42.6602 10.5537 42.567 10.3379 42.3938 10.1624C42.2207 9.97354 42.021 9.89258 41.7679 9.89258Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M49.2386 9.87891C48.9989 9.87891 48.7859 9.97336 48.6261 10.1488C48.4529 10.3242 48.373 10.5401 48.373 10.7964C48.373 11.0528 48.4529 11.2552 48.6261 11.4441C48.7992 11.6195 48.9989 11.714 49.2386 11.714C49.4783 11.714 49.6914 11.6195 49.8645 11.4441C50.0377 11.2687 50.1309 11.0528 50.1309 10.7964C50.1309 10.5401 50.0377 10.3377 49.8645 10.1488C49.7047 9.95987 49.4917 9.87891 49.2386 9.87891Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M54.2318 9.89258C53.9921 9.89258 53.779 9.98703 53.6192 10.1624C53.4461 10.3379 53.3662 10.5537 53.3662 10.8101C53.3662 11.0665 53.4461 11.2689 53.6192 11.4578C53.7924 11.6332 53.9921 11.7277 54.2318 11.7277C54.4715 11.7277 54.6846 11.6332 54.8577 11.4578C55.0308 11.2824 55.1241 11.0665 55.1241 10.8101C55.1241 10.5537 55.0308 10.3379 54.8577 10.1624C54.6846 9.97354 54.4715 9.89258 54.2318 9.89258Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M56.4431 3.22656H39.5573C38.2655 3.22656 37.2002 4.30602 37.2002 5.61487V15.2895C37.2002 16.5984 38.2655 17.6778 39.5573 17.6778H46.1891C46.1891 17.6778 47.4675 21.2266 47.9336 21.2266C48.3997 21.2266 49.7847 17.6778 49.7847 17.6778H56.4431C57.7348 17.6778 58.8002 16.5984 58.8002 15.2895V5.61487C58.8002 4.30602 57.7348 3.22656 56.4431 3.22656Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M84.002 4.25C84.0129 4.25 90.8797 4.25053 92.5977 4.71582C93.5446 4.96807 94.2897 5.71721 94.542 6.67188C94.9999 8.39891 94.9961 12 94.9961 12C94.9961 12.0252 94.9944 15.6073 94.5381 17.3281C94.2858 18.2789 93.5407 19.0281 92.5938 19.2842C90.8781 19.7459 83.998 19.7461 83.998 19.7461C83.9875 19.7461 77.1166 19.7456 75.4023 19.2842C74.4554 19.0319 73.7103 18.2828 73.458 17.3281C73.0017 15.6073 73 12.0252 73 12C73 12 73.0002 8.39887 73.4619 6.66797C73.7142 5.71718 74.4593 4.96804 75.4062 4.71191C77.1218 4.25014 84.002 4.25 84.002 4.25ZM81.751 15.2715L87.502 12L81.751 8.72852V15.2715Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M120 8.83398C118.288 8.83398 116.833 10.2889 116.833 12.0007C116.833 13.7124 118.288 15.1673 120 15.1673C121.711 15.1673 123.166 13.7124 123.166 12.0007C123.166 10.2889 121.711 8.83398 120 8.83398Z"
                    fill="#BDBDBD"
                  />
                  <path
                    d="M124.059 2.5H116.027C112.918 2.5 110.5 4.91818 110.5 7.94091V15.9727C110.5 19.0818 112.918 21.5 116.027 21.5H124.059C127.082 21.5 129.5 19.0818 129.5 15.9727V7.94091C129.5 4.91818 127.082 2.5 124.059 2.5Z"
                    fill="#BDBDBD"
                  />
                </svg>
              </div>
            </div>

            {/* Company info: 16px / 140% / -3% / #9D9D9D, width 640 (작은 화면에선 자동 줄바꿈) */}
            <div className="font-pretendard mt-[16px] w-full max-w-[640px] text-[16px] leading-[22px] font-[200] tracking-[-0.05em] text-[#9D9D9D]">
              <p>
                대표자 : 이한별 | 사업자 등록번호 : 540-86-00384 | 통신판매업
                신고번호 : 2020-경기김포-3725호
              </p>
              <p className="mt-[6px]">
                주소 : 경기도 김포시 사우중로 87 201호 | 이메일 :
                kdigital@nextrunners.co.kr | 전화 : 070-4099-8219
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
