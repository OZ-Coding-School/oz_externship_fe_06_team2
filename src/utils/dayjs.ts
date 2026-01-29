import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.extend(relativeTime)
dayjs.locale('ko')

// 몇 시간 전, 몇 일 전, 몇 주 전, 몇 개월 전, 몇 년 전
export const getRelativeTime = (date: string | Date) => {
  return dayjs(date).fromNow()
}

// YYYY년 M월 D일
export const formatDate = (date: string | Date) => {
  return dayjs(date).format('YYYY년 M월 D일')
}
