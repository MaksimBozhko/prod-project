import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import classNames, { Mods } from '../../lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean
  size?: ButtonSize
  disabled?: boolean
  children?: ReactNode
  fullWidth?: boolean
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ThemeButton.OUTLINE,
    square,
    size = ButtonSize.M,
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const mode: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  }

  return (
    <button
      type="button"
      className={classNames(cls.Button, mode, [className, cls[theme], cls[size]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
})
