import React from 'react';
import classNames from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss'
import {AppLink, ThemeAppLink} from 'shared/ui/AppLink/AppLink';
import {ThemeSwitcher} from 'shared/ui/ThemeSwitcher';

interface NavbarProps {
    className?: string
}

export const Navbar = ({className}: NavbarProps) => {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <ThemeSwitcher />
            <div className={cls.links}>
                <AppLink theme={ThemeAppLink.SECONDARY} to={'/'} className={cls.mainLink}>
                    Главная
                </AppLink>
                <AppLink theme={ThemeAppLink.SECONDARY} to={'/about'} className={cls.mainLink}>
                    О сайте
                </AppLink>
            </div>
        </div>
    )
}