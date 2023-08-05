import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleList } from 'entities/Article';
import { useCallback } from 'react';
import { Page } from 'widgets/Page/Page';
import { Text } from 'shared/ui/Text/Text';
import { ArticlesFilters, getArticlesFiltersView } from 'features/articlesFilters';
import { useSearchParams } from 'react-router-dom'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageReducer, getArticles } from '../../model/slices/ArticlesPageSlice';
import { getArticlesError, getArticlesIsLoading } from '../../model/selectors/articlesPageSelectors';
import cls from './ArticlesPage.module.scss'

interface Props {
  className?: string
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = ({ className }: Props) => {
  const { t } = useTranslation('article')

  const dispatch = useAppDispatch()
  const isLoading = useSelector(getArticlesIsLoading)
  const view = useSelector(getArticlesFiltersView)
  const error = useSelector(getArticlesError)
  const articles = useSelector(getArticles.selectAll)
  const [searchParams] = useSearchParams()

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  if (error) {
    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
        <Page
          onScrollEnd={onLoadNextPart}
          className={classNames('', {}, [className])}
        >
          <Text title={t('Произошла ошибка при загрузке статей')} text={t('Попробуйте позже)')} />
        </Page>
      </DynamicModuleLoader>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames('', {}, [className])}
      >
        <ArticlesFilters />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
          className={cls.list}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default ArticlesPage
