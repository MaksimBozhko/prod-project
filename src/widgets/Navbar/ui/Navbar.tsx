import React from 'react';
import classNames from 'shared/lib/classNames/classNames';
import { AppLink, ThemeAppLink } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export const Navbar = ({ className }: NavbarProps) => (
  <div className={classNames(cls.Navbar, {}, [className])}>
    <div className={cls.links}>
      <AppLink theme={ThemeAppLink.SECONDARY} to="/" className={cls.mainLink}>
        Главная
      </AppLink>
      <AppLink theme={ThemeAppLink.SECONDARY} to="/about" className={cls.mainLink}>
        О сайте
      </AppLink>
    </div>
  </div>
);
