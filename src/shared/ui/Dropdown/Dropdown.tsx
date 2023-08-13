import { Menu } from '@headlessui/react'
import classNames from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropDownDirection } from 'shared/types/ui';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './Dropdown.module.scss'

const mapDirectionsClass: Record<DropDownDirection, string> = {
  'bottom right': cls.optionsBottomRight,
  'bottom left': cls.optionsBottomLeft,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight,
}

type DropdownItem = {
  disabled?: boolean
  href?: string
  content: ReactNode
  onClick?: () => void
}

interface DropdownType {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DropDownDirection
}

export function Dropdown(props: DropdownType) {
  const {
    className,
    items,
    trigger,
    direction = 'bottom right',
  } = props

  return (
    <Menu as="div" className={classNames(cls.DropDown, {}, [className])}>
      <Menu.Button className={cls.btn}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, [mapDirectionsClass[direction]])}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              onClick={item.onClick}
              className={classNames(cls.item, { [cls.active]: active, [cls.disabled]: item.disabled })}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            )
          }

          return (
            <Menu.Item as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
