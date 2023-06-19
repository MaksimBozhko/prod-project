import React from 'react';
import './styles/index.scss'
import cn from 'shared/lib/classNames/classNames'
import {useTheme} from 'app/providers/ThemeProvider';
import {AppRouter} from 'app/providers/router';
import {Navbar} from 'widgets/Navbar';
import {Sidebar} from 'widgets/Sidebar';

export const App = () => {
    const { theme } = useTheme()
    return (
        <div className={cn('app', {}, [theme])}>
            <Navbar/>
            <div className={'content-page'}>
                <Sidebar/>
                <AppRouter/>
            </div>
        </div>
    )
}