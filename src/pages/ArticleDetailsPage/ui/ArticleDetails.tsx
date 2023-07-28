import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

interface ArticleDetailsProps {
  className?: string
}

const ArticleDetails = ({ className }: ArticleDetailsProps) => {
  const { t } = useTranslation('article')

  return (
    <div className={classNames('', {}, [className])}>
      {t('детали статей')}
    </div>
  )
}

export default ArticleDetails
