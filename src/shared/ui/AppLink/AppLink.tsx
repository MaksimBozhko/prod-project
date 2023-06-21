import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum ThemeAppLink {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: ThemeAppLink
}

export const AppLink: FC<AppLinkProps> = (props) => {
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
};
