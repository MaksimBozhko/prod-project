import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { getIsSidebarCollapsed, Sidebar } from '@/widgets/Sidebar';
import { useTheme } from '@/app/providers/ThemeProvider';
import { getUserInited, userActions } from '@/entities/User';
import classNames from '@/shared/lib/classNames/classNames';

export const App = () => {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const inited = useSelector(getUserInited)
  const isSidebarCollapsed = useSelector(getIsSidebarCollapsed)

  console.log(isSidebarCollapsed)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <div className="contentPage">
          <Sidebar />
          <div className={classNames('mainContentCollapsed', {['mainContent']: !!isSidebarCollapsed }, [])}>
            <Navbar />
            {inited && <AppRouter />}
          </div>
        </div>
      </Suspense>
    </div>
  );
};
