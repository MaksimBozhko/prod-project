import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { useCallback } from 'react';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextArticlesPage } from 'pages/Articles/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { Text } from 'shared/ui/Text/Text';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/ArticlesPageSlice';
import {
  getArticlesError,
  getArticlesHasMore,
  getArticlesIsLoading,
  getArticlesPage,
  getArticlesView,
} from '../../model/selectors/articlesPageSelectors';

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
  const view = useSelector(getArticlesView)
  const error = useSelector(getArticlesError)
  const articles = useSelector(getArticles.selectAll)

  useInitialEffect(() => {
    dispatch(articlesPageActions.initState())
    dispatch(fetchArticlesList({ page: 1 }))
  })

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  if (error) {
    return (
      <DynamicModuleLoader reducers={reducers}>
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
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames('', {}, [className])}
      >
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default ArticlesPage
