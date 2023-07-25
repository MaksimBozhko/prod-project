import classNames from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  size?: number
  src?: string
  alt?: string
}

export const Avatar = ({
  className, src, size, alt,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100,
  }), [size])
  return (
    <img
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
      src={src}
      alt={alt}
    />
  )
}
