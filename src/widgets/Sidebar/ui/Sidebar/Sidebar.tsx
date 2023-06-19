import classNames from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss'
import {ThemeSwitcher} from 'shared/ui/ThemeSwitcher';
import React, {useState} from 'react';

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const onToggle = () => {
        setCollapsed(prev => !prev)
    }
    return (
        <div className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}>
            <button onClick={onToggle}>toggle</button>
            <div className={cls.switchers}>
                <ThemeSwitcher/>
                {/*lang*/}
            </div>
        </div>
    )
}