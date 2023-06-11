import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainPage} from 'pages/MainPage';
import {AboutPage} from 'pages/AboutPage';
import {routeConfig} from 'shared/config/routeConfig/routeConfig';

export const AppRouter = () => {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Routes>
                {Object.values(routeConfig).map(({element, path}) => (
                    <Route key={path} path={path} element={element}/>
                ))}
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/about'} element={<AboutPage/>}/>
            </Routes>
        </Suspense>
    )
}