import classNames from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss'

export enum TextAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum ThemeText {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: ThemeText
  align?: TextAlign
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    theme = ThemeText.PRIMARY,
    title,
    text,
    align = TextAlign.LEFT,
  } = props
  return (
    <div className={classNames(cls.Text, {}, [className, cls[theme], cls[align]])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
})
