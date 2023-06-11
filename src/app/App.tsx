import React from 'react';
import {Link} from 'react-router-dom';
import './styles/index.scss'
import cn from 'shared/lib/classNames/classNames'
import {useTheme} from 'app/providers/ThemeProvider';
import {AppRouter} from 'app/providers/router';

export const App = () => {
    const {theme, toggleTheme} = useTheme()
    return (
        <div className={cn('app', {}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to={'/'} >Главная</Link>
            <Link to={'/about'} >О сайте</Link>
         <AppRouter/>
        </div>
    )
}