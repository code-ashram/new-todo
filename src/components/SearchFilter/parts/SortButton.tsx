import { FC, useState } from 'react'

type Props = {
  prevImage: string,
  nextImage: string,
  onClick: () => void,
}

const SortButton: FC<Props> = ({prevImage, nextImage, onClick}) => {
  const [icon, setIcon] = useState<boolean>(true)

  const handleToggleIcon = () => {
    setIcon(prevIcon => !prevIcon)

    onClick()
  }

  return (
    <button className="sortNameButton btn btn-secondary" onClick={handleToggleIcon}>
      <img src={icon ? prevImage : nextImage} alt="Sort by title icon" />
    </button>
  )
}

export default SortButton
