import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';

interface PageErrorProps {
    className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
  const { t } = useTranslation('about');
  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }
  return (
    <div className={classNames('', {}, [className])}>
      {console.log(t('Произошла ошибка'))}
      {t('Произошла ошибка')}
      <Button onClick={reloadPage}>
        {t('Обновите страницу')}
      </Button>
    </div>
  )
}
