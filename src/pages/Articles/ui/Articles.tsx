import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

interface Props {
  className?: string
}

const Articles = ({ className }: Props) => {
  const { t } = useTranslation('article')

  return (
    <div className={classNames('', {}, [className])}>
      {t('статьи')}
    </div>
  )
}

export default Articles
