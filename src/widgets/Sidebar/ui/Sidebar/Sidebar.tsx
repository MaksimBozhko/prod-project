import React, { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import { LangSwitcher } from '@/widgets/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button/Button';
import { SidebarItem } from '@/widgets/Sidebar/ui/SidebarItem/SidebarItem';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems/getSidebarItems';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems)
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
    <SidebarItem
      item={item}
      collapsed={collapsed}
      key={item.path}
    />
  )), [collapsed, sidebarItemsList]);

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <VStack role="navigation" gap="8" className={cls.items}>
        {itemsList}
      </VStack>
      <Button
        data-testid="sidebar-toggle"
        type="button"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ThemeButton.BACKGROUND_INVERTED}
        size={ButtonSize.XL}
        square
      >
        {collapsed ? '>' : '<'}
      </Button>
    </aside>
  );
})
