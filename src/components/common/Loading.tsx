export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center gap-[8px]">
      <span className="loading_dots animate-bounce delay-1"></span>
      <span className="loading_dots animate-bounce delay-2"></span>
      <span className="loading_dots animate-bounce delay-3"></span>
    </div>
  )
}
