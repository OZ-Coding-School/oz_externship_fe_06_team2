import type { Category } from '@/types'

/**
 * 카테고리 트리에서 특정 카테고리 ID를 찾아 해당 카테고리와 부모 카테고리들의 ID를 반환
 * @param categories 전체 카테고리 배열
 * @param targetId 찾고자 하는 카테고리 ID
 * @returns { mainId, subId, detailId } 또는 null
 */
export function findCategoryPath(
  categories: Category[] | undefined,
  targetId: number
): {
  mainId: number | null
  subId: number | null
  detailId: number | null
} | null {
  if (!categories) return null

  // 대분류 순회
  for (const mainCategory of categories) {
    // 대분류만 넘길때
    if (mainCategory.id === targetId) {
      return {
        mainId: mainCategory.id,
        subId: null,
        detailId: null,
      }
    }

    // 중분류 순회
    if (mainCategory.subcategories) {
      for (const subCategory of mainCategory.subcategories) {
        // 중분류까지만 넘길때
        if (subCategory.id === targetId) {
          return {
            mainId: mainCategory.id,
            subId: subCategory.id,
            detailId: null,
          }
        }

        // 소분류 순회
        if (subCategory.subcategories) {
          for (const detailCategory of subCategory.subcategories) {
            // 소분류까지 넘길때
            if (detailCategory.id === targetId) {
              return {
                mainId: mainCategory.id,
                subId: subCategory.id,
                detailId: detailCategory.id,
              }
            }
          }
        }
      }
    }
  }

  return null
}
