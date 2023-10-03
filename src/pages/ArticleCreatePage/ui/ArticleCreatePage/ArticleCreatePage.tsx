import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useParams } from 'react-router-dom';
import classNames from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page/Page';
import { CreateArticle } from '@/features/createArticle';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cls from '@/features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader.module.scss';

interface ArticleEditPageProps {
  className?: string
}

const ArticleCreatePage = memo(({className}: ArticleEditPageProps) => {
  const {t} = useTranslation('article')
  const {id} = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  return (
    <Page className={classNames('', {}, [className])}>
      <Text
        title={
          isEdit
            ? t('Редактирование статьи ')
            : t('Новая статья')
        }
        size={TextSize.L}
        className={cls.title}
      />
      <CreateArticle id={id}/>
    </Page>
  )
})

export default ArticleCreatePage
