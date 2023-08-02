import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { useCallback } from 'react';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/ArticlesPageSlice';
import { getArticlesIsLoading, getArticlesView } from '../../model/selectors/articlesPageSelectors';

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
  const articles = useSelector(getArticles.selectAll)

  useInitialEffect(() => {
    dispatch(fetchArticlesList())
    dispatch(articlesPageActions.initState())
  })

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames('', {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ArticlesPage
