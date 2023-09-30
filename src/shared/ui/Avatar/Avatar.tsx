import { CSSProperties, useMemo } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss'

interface AvatarProps {
  className?: string
  size?: number | string
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
