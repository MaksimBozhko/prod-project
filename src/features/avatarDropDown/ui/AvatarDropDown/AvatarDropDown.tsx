import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from '@/shared/lib/classNames/classNames'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import {
  getUserAuthData, getUserIsAdmin, getUserIsManager, userActions,
} from '@/entities/User';
import cls from './AvatarDropDown.module.scss'

interface AvatarDropDownProps {
  className?: string
}

export const AvatarDropDown = memo(({ className }: AvatarDropDownProps) => {
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();
  const isAdmin = useSelector(getUserIsAdmin)
  const isManager = useSelector(getUserIsManager)
  const isAdminPanelAvailable = isAdmin || isManager

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null
  }
  return (
    <Dropdown
      className={classNames(cls.AvatarDropDown, {}, [className])}
      items={[
        ...(isAdminPanelAvailable ? [
          {
            content: t('Админка'),
            href: RoutePath.admin_panel,
          },
        ]
          : []),
        {
          content: t('Профиль'),
          href: RoutePath.profile + authData.id,
        },
        {
          content: t('Выйти'),
          onClick: onLogout,
        },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
      direction="bottom left"
    />
  )
})
