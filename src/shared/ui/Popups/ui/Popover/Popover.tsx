import { Popover as HPopover } from '@headlessui/react'
import { ReactNode } from 'react';
import { DropDownDirection } from '@/shared/types/ui';
import classNames from '@/shared/lib/classNames/classNames';
import { mapDirectionsClass } from '@/shared/ui/Popups/styles/const';
import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'

interface PopoverProps {
  className?: string
  children: ReactNode
  trigger: ReactNode
  direction?: DropDownDirection
}

export function Popover(props: PopoverProps) {
  const {
    children,
    className,
    trigger,
    direction = 'bottom right',
  } = props
  return (
    <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
      <HPopover.Button as="div" className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(cls.panel, {}, [mapDirectionsClass[direction]])}>
        {children}
      </HPopover.Panel>
    </HPopover>
  )
}
