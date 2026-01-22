import Button from '@/components/common/Button'
import ProfileImage from '@/assets/images/svg/ProfileThumb.svg'
export default function DetailsWriter() {
  return (
    <section className="writer_box mt-[52px]">
      <div className="writer_header">
        <div className="flex gap-[12px]">
          <img src={ProfileImage} alt="프로필 이미지" />
          <div>
            <span className="text-[12px] text-[#6201E0]">{'오즈오즈'} 님,</span>
            <p className="text-[18px] font-semibold text-[#222]">
              정보를 공유해 주세요.
            </p>
          </div>
        </div>
        <Button size="md" style="purple_bg round" disabled={false}>
          등록하기
        </Button>
      </div>
      <div className="write_box h-[677px]">에디터 들어갈 자리</div>
    </section>
  )
}
