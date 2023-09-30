import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/Input/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SortOrder } from '@/shared/types';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleType, ArticleView, ArticleViewSelector } from '@/entities/Article';
import { Card } from '@/shared/ui/Card/Card';
import { articlesPageActions } from '@/pages/ArticlesPage/model/slices/ArticlesPageSlice';
import { fetchArticlesList } from '@/pages/ArticlesPage';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { Icon } from '@/shared/ui/Icon/Icon';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { ArticleSortField, typeTabs } from '../../model/consts/consts';
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector';
import { ArticleTypeTabs } from '../ArticleTypeTabs/ArticleTypeTabs';
import {
  getArticlesFiltersOrder,
  getArticlesFiltersSearch,
  getArticlesFiltersSort,
  getArticlesFiltersType,
  getArticlesFiltersView,
} from '../../model/selectors/articlesFiltersSelectors';
import { articlesFiltersActions, articlesFiltersReducer } from '../../model/slice/ArticlesFiltersSlice';
import cls from './ArticlesFilters.module.scss'
import PlusIcon from '../../../../shared/assets/icons/plus-icon.svg'

interface ArticlesFiltersProps {
  className?: string
}

const reducers: ReducerList = {
  articlesFilters: articlesFiltersReducer,
}

export const ArticlesFilters = memo(({ className }: ArticlesFiltersProps) => {
  const { t } = useTranslation('article')
  const dispatch = useAppDispatch()

  const search = useSelector(getArticlesFiltersSearch)
  const order = useSelector(getArticlesFiltersOrder)
  const sort = useSelector(getArticlesFiltersSort)
  const view = useSelector(getArticlesFiltersView)
  const type = useSelector(getArticlesFiltersType)

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }))
  }, [dispatch])

  const debouncedFetchData = useDebounce(fetchData, 800)

  const onChangeSearch = useCallback((value: string) => {
    dispatch(articlesFiltersActions.setSearch(value))
    dispatch(articlesPageActions.setPage(1))
    debouncedFetchData()
  }, [debouncedFetchData, dispatch])
  const onChangeOrder = useCallback((value: SortOrder) => {
    dispatch(articlesFiltersActions.setOrder(value))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])
  const onChangeSort = useCallback((value: ArticleSortField) => {
    dispatch(articlesFiltersActions.setSort(value))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])
  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(articlesFiltersActions.setType(value))
    dispatch(articlesPageActions.setPage(1))
    fetchData()
  }, [dispatch, fetchData])
  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesFiltersActions.setView(view))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticlesFilters, {}, [className])}>
        <div className={cls.sort}>
          <ArticleSortSelector
            orderValue={order}
            sortValue={sort}
            onOrderChange={onChangeOrder}
            onSortChange={onChangeSort}
          />
          <div className={cls.iconBlock}>
            <AppLink to={RoutePath.articles_create}>
              <Icon className={cls.plusIcon} Svg={PlusIcon} />
            </AppLink>
            <ArticleViewSelector className={cls.viewSelector} view={view} onViewClick={onChangeView} />
          </div>
        </div>
        <Card>
          <Input
            placeholder={t('Поиск')}
            value={search}
            onChange={onChangeSearch}
          />
        </Card>
        <ArticleTypeTabs
          value={type}
          onTypeChanged={onChangeType}
          className={cls.tabs}
          tabs={typeTabs}
        />
      </div>
    </DynamicModuleLoader>
  )
})
