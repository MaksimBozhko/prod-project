import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { getUserAuthData } from '@/entities/User';
import classNames from '@/shared/lib/classNames/classNames';
import { LoginModal } from '@/features/AuthByUserName';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropDown } from '@/features/avatarDropDown';
import cls from './Navbar.module.scss';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import { LangSwitcher } from '@/widgets/LangSwitcher/LangSwitcher';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  let content = (
    <>
      <LangSwitcher className={cls.lang}/>
      <ThemeSwitcher />
    </>
  )

  if (authData) {
    return (
      <header className={classNames(cls.Navbar, {}, [className])}>
        {/*<Text*/}
        {/*  className={cls.appName}*/}
        {/*  title={t('Ulbi TV App')}*/}
        {/*  theme={ThemeText.INVERTED}*/}
        {/*/>*/}
        <HStack
          gap="24"
        >
          {content}
          <NotificationButton />
          <AvatarDropDown className={cls.dropDown} />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.Navbar, {}, [className])}>
      {content}
      <Button
        theme={ThemeButton.CLEAR}
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
