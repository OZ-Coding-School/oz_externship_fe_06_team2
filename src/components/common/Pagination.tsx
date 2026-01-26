import Pagi_first from '@/assets/images/svg/Pagi_first.svg?react'
import Pagi_prev from '@/assets/images/svg/Pagi_prev.svg?react'
import Pagi_next from '@/assets/images/svg/Pagi_next.svg?react'
import Pagi_last from '@/assets/images/svg/Pagi_last.svg?react'
export default function Pagination() {
  return (
    <>
      <ul className="pagination">
        <li className="pagi_control">
          <button type="button">
            <Pagi_first />
          </button>
        </li>
        <li className="pagi_control">
          <button type="button">
            <Pagi_prev />
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            1
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            2
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            3
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            4
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            5
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            6
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            7
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            8
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            9
          </button>
        </li>
        <li>
          <button type="button" className="pagi_item">
            10
          </button>
        </li>
        <li className="pagi_control">
          <button type="button">
            <Pagi_next />
          </button>
        </li>
        <li className="pagi_control">
          <button type="button">
            <Pagi_last />
          </button>
        </li>
      </ul>
    </>
  )
}
