import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useParams } from 'react-router-dom';
import classNames from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page/Page';

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  return (
    <Page className={classNames('', {}, [className])}>
      {isEdit
        ? t('Редактирование статьи ') + id
        : t('Создание новой статьи')}
    </Page>
  )
})

export default ArticleEditPage
