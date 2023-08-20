import { memo, useState } from 'react'
import classNames from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon';
import StarIcon from '@/shared/assets/icons/star.svg'

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void
  size?: number
  selectStarts?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
  const {
    className,
    onSelect,
    size = 40,
    selectStarts = 0,
  } = props

  const [currentStartsCount, setCurrentStartsCount] = useState(0)
  const [isSelected, setIsSelected] = useState(Boolean(selectStarts))

  const onClick = (count: number) => () => {
    if (!isSelected) {
      onSelect?.(count)
      setCurrentStartsCount(count)
      setIsSelected(true)
    }
  }

  const onMouseMove = (count: number) => () => {
    if (!isSelected) {
      setCurrentStartsCount(count)
    }
  }

  const onMouseLeave = () => {
    if (!isSelected) {
      setCurrentStartsCount(0)
    }
  }

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((star) => (
        <Icon
          key={star}
          className={classNames(
            cls.starIcon,
            {
              [cls.hover]: currentStartsCount >= star,
              [cls.selected]: isSelected,
            },
          )}
          Svg={StarIcon}
          onClick={onClick(star)}
          onMouseMove={onMouseMove(star)}
          onMouseLeave={onMouseLeave}
          width={size}
          height={size}
        />
      ))}
    </div>
  )
})
