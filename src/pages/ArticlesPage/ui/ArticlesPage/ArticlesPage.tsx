import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom'
import classNames from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';
import { ArticlesFilters } from '@/features/articlesFilters';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleInfiniteList } from '../../ui/ArticleInfiniteList/ArticleInfiniteList';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageReducer } from '../../model/slices/ArticlesPageSlice';
import cls from './ArticlesPage.module.scss'
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';

interface Props {
  className?: string
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({ className }: Props) => {
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames('', {}, [className])}
      >
        <Text title={t('Статьи')} size={TextSize.L} className={cls.title} />
        <ArticlesFilters className={cls.filters} />
        <ArticleInfiniteList />
      </Page>
    </DynamicModuleLoader>
  )
}

export default ArticlesPage
