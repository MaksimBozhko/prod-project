import { Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { Button } from 'shared/ui/Button/Button';
import classNames from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { DropDownDirection } from 'shared/types/ui';
import cls from './ListBox.module.scss'
import popupCls from '../../styles/popup.module.scss'
import { mapDirectionsClass } from '../../styles/const';

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

export function ListBox(props: ListBoxType) {
  const {
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = 'bottom right',
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
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
      >
        <HListBox.Button
          className={popupCls.trigger}
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
                    { [popupCls.active]: active, [popupCls.disabled]: item.disabled },
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
