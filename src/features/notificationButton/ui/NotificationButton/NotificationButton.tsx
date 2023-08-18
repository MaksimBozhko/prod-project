import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { Popover } from 'shared/ui/Popups';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { NotificationList } from 'entities/Notification';
import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
  const { t } = useTranslation()

  return (
    <Popover
      className={classNames(cls.NotificationButton, {}, [className])}
      trigger={(
        <Button theme={ThemeButton.CLEAR}>
          <Icon Svg={NotificationIcon} inverted />
        </Button>
      )}
      direction="bottom left"
    >
      <NotificationList className={cls.notifications} />
    </Popover>
  )
})
