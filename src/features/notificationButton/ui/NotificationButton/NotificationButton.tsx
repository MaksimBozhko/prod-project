import React, { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect';
import classNames from '@/shared/lib/classNames/classNames'
import { Popover } from '@/shared/ui/Popups';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const trigger = (
    <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR} className={classNames(cls.notificationBtn)}>
      <Icon Svg={NotificationIcon} />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>

  );
})
