import classNames from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss'

export enum TextAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

export enum ThemeText {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error'
}

interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: ThemeText
  align?: TextAlign
  size?: TextSize
  'data-testid'?: string
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    theme = ThemeText.PRIMARY,
    title,
    text,
    align = TextAlign.LEFT,
    size = TextSize.M,
    'data-testid': dataTestId = 'Paragraph',
  } = props

  const HeaderTag = mapSizeToHeaderTag[size]

  return (
    <div className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}>
      {title && <HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>{title}</HeaderTag>}
      {text && <HeaderTag data-testid={`${dataTestId}.Paragraph`} className={cls.text}>{text}</HeaderTag>}
    </div>
  )
})
