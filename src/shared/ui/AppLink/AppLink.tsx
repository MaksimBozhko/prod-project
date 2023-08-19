import { memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum ThemeAppLink {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: ThemeAppLink
  children?: ReactNode
}

export const AppLink = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    theme = ThemeAppLink.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={classNames(cls.AppLink, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </Link>
  );
})
