import ChevronRightGray from '@/assets/images/svg/Chevron-right-gray.svg?react'

interface CategoryBreadcrumbProps {
  categories: string[]
}

export default function CategoryBreadcrumb({
  categories,
}: CategoryBreadcrumbProps) {
  return (
    <div className="mb-[12px] flex items-center gap-2">
      {categories.map((name, index) => {
        const isLast = index === categories.length - 1

        return (
          <div key={index} className="flex items-center gap-2">
            {isLast ? (
              <a
                href={`/category/${name}`}
                className="text-[12px] text-[#4D4D4D] underline"
              >
                {name}
              </a>
            ) : (
              <>
                <span className="text-[12px] text-[#4D4D4D]">{name}</span>
                <ChevronRightGray className="h-4 w-4" />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
