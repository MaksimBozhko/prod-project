import classNames from 'shared/lib/classNames/classNames'
import { CSSProperties, memo } from 'react'
import cls from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  width: string | number
  height: string | number
  border?: string
}

export const Skeleton = memo((props: SkeletonProps) => {
  const {
    className,
    width,
    height,
    border,
  } = props

  const styles: CSSProperties = {
    maxWidth: width,
    height,
    borderRadius: border,
  }

  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={styles}
    />
  )
})
