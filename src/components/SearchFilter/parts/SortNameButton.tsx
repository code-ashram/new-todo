import sortIncrease from '../../../img/sort-increase.svg'
import sortDecrease from '../../../img/sort-decrease.svg'
import { useState } from 'react'

const SortNameButton = () => {
  const [icon, setIcon] = useState<boolean>(true)

  const handleToggleIcon = () => {
    setIcon(prevIcon => !prevIcon)
  }

  return (
    <button className="sortNameButton btn btn-secondary" onClick={handleToggleIcon}>
      <img src={icon ? sortIncrease : sortDecrease} alt="Sort by title icon" />
    </button>
  )
}

export default SortNameButton
