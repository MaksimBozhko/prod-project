import { Menu } from '@headlessui/react'
import { forwardRef, Fragment, ReactNode, Ref, useEffect, useRef, useState } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { mapDirectionsClass } from '../../styles/const';
import cls from './Dropdown.module.scss'
import popupCls from '../../styles/popup.module.scss'

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
  // clickDropDownHandler: () => void
}

export const Dropdown = forwardRef((props: DropdownType, ref: any) => {
  const {
    className,
    items,
    trigger,
    direction = 'bottom right',
    // clickDropDownHandler
  } = props

  return (
    <Menu as="div" className={classNames(cls.DropDown, {}, [className, popupCls.popup])}>
      <Menu.Button className={popupCls.trigger}>
        {trigger}
      </Menu.Button>
      <Menu.Items ref={ref} className={classNames(cls.menu, {}, [mapDirectionsClass[direction]])} >
        {items.map((item, index) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              type="button"
              onClick={item.onClick}
              className={classNames(cls.item, { [popupCls.active]: active, [popupCls.disabled]: item.disabled })}
            >
              {item.content}
            </button>
          )

          if (item.href) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
                key={`dropdown-key-${index}`}
              >
                {content}
              </Menu.Item>
            )
          }

          return (
            <Menu.Item
              as={Fragment}
              disabled={item.disabled}
              key={`dropdown-key-${index}`}
            >
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
})
