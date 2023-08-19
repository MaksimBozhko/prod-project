import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import classNames from '@/shared/lib/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import cls from './GoBackBtn.module.scss'
import ArrowLeftIcon from '../../assets/icons/arrowleft.svg'

interface GoBackBtnProps {
  className?: string
  children: ReactNode
}

export const GoBackBtn = (
  {
    className,
    children,
  }: GoBackBtnProps,
) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <Button
      onClick={goBack}
      theme={ThemeButton.CLEAR}
      className={classNames(cls.GoBackBtn, {}, [className])}
    >
      <Icon Svg={ArrowLeftIcon} />
      {children}
    </Button>
  )
}
