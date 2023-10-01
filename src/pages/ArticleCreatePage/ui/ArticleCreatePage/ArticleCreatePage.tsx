import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useParams } from 'react-router-dom';
import classNames from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page/Page';
import { CreateArticle, createArticleReducer } from '@/features/createArticle';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cls from '@/features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader.module.scss';

interface ArticleEditPageProps {
  className?: string
}

const reducer: ReducerList = {
  createArticle: createArticleReducer,
}

const ArticleCreatePage = memo(({className}: ArticleEditPageProps) => {
  const {t} = useTranslation('article')
  const {id} = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  return (
    <DynamicModuleLoader reducers={reducer}>
      <Page className={classNames('', {}, [className])}>
        <Text
          title={
          isEdit
            ? t('Редактирование статьи ') + id
            : t('Новая статья')
        }
          size={TextSize.L}
          className={cls.title}
        />
        <CreateArticle/>
      </Page>
    </DynamicModuleLoader>
  )
})

export default ArticleCreatePage
