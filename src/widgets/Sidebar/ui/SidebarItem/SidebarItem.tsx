import { useTranslation } from 'react-i18next';
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppLink, ThemeAppLink } from '@/shared/ui/AppLink/AppLink';
import classNames from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebarItemType';
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation()
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }
  return (
    <div className={classNames('', { [cls.collapsed]: collapsed })}>
    <AppLink
      theme={ThemeAppLink.SECONDARY}
      to={item.path}
      className={classNames(cls.item, )}
    >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>
        {t(item.text)}
      </span>
    </AppLink>
    </div>
  )
})
