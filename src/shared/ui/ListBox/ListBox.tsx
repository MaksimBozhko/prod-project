import { Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { Button } from 'shared/ui/Button/Button';
import classNames from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import cls from './ListBox.module.scss'

type DropDownDirection = 'top' | 'bottom'

type ListBoxItem = {
  value: string
  content: ReactNode
  disabled?: boolean
}

type ListBoxType = {
  items?: ListBoxItem[]
  className?: string
  value?: string
  defaultValue?: string
  onChange: (value: string) => void
  readonly?: boolean
  direction?: DropDownDirection
  label?: string
}

const mapDirectionsClass: Record<DropDownDirection, string> = {
  bottom: cls.optionsBottom,
  top: cls.optionsTop,
}

export function ListBox(props: ListBoxType) {
  const {
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom',
    label,
  } = props

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        value={value}
        onChange={onChange}
        className={classNames(cls.ListBox, {}, [className])}
      >
        <HListBox.Button
          className={cls.trigger}
        >
          <Button
            disabled={readonly}
          >
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, [mapDirectionsClass[direction]])}>
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item?.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.item,
                    { [cls.active]: active, [cls.disabled]: item.disabled },
                  )}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}
