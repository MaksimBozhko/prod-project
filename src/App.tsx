import React, {Suspense} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './pages/styles/index.scss'
import {MainPageAsync} from './pages/MainPage/MainPage.async';
import {AboutPageAsync} from './pages/AboutPage/AboutPage.async';
import {useTheme} from './theme/useTheme';
import cn from './lib/classNames/classNames'

export const App = () => {
    const {theme, toggleTheme} = useTheme()
    return (
        <div className={cn('app', {}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to={'/'} >Главная</Link>
            <Link to={'/about'} >О сайте</Link>
            <Suspense fallback={<>Loading...</>}>
            <Routes>
                <Route path={'/'} element={<MainPageAsync/>} />
                <Route path={'/about'} element={<AboutPageAsync/>} />
            </Routes>
            </Suspense>
        </div>
    )
}