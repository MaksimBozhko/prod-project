import React, {
  InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './Textarea.module.scss'

type HTMLTextAreaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'readOnly'>

interface TextAreaProps extends HTMLTextAreaProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autoFocus?: boolean
  readonly?: boolean
}

export const Textarea = memo((props: TextAreaProps) => {
  const {
    className,
    value,
    onChange,
    placeholder,
    autoFocus,
    readonly,
    ...otherProps
  } = props

  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [isFocused, setIsFocused] = useState(false)
  // const [caretPosition, setCaretPosition] = useState(0)

  const onBlur = () => {
    setIsFocused(false)
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  // const onSelect = (e: any) => {
  //   setCaretPosition(e?.target?.selectionStart || 0)
  // }

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
    // setCaretPosition(e.target.value.length)
  }

  // useEffect(() => {
  //   if (autoFocus) {
  //     setIsFocused(true)
  //     ref.current?.focus()
  //   }
  // }, [autoFocus])

  useEffect(() => {
    if (ref?.current) {
      ref.current.style.height = '0px'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [onChangeHandler])

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {`${placeholder}>`}
        </div>
      )}
        <textarea
          ref={ref}
          value={value || ''}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readonly}
          {...otherProps}
        />
    </div>
  )
})
