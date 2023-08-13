import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Text, ThemeText } from 'shared/ui/Text/Text';
import classNames from 'shared/lib/classNames/classNames';
import { LoginModal } from 'features/AuthByUserName';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title={t('Ulbi TV App')}
          theme={ThemeText.INVERTED}
        />

        <Dropdown
          className={cls.dropdown}
          items={[
            {
              content: t('Профиль'),
              href: RoutePath.profile + authData.id,
            },
            {
              content: t('Выйти'),
              onClick: onLogout,
            },
          ]}
          trigger={<Avatar size={30} src={authData.avatar} />}
          direction="bottom left"
        />
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      <Button
        theme={ThemeButton.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t('Войти')}
      </Button>
      { isAuthModal && (
        <LoginModal
          isOpen={isAuthModal}
          onClose={onCloseModal}
        />
      )}
    </header>
  );
});
