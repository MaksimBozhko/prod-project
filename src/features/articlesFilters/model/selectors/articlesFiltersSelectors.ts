import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleType, ArticleView } from '@/entities/Article';
import { ArticleSortField } from '../consts/consts';

export const getArticlesFiltersSearch = (state: StateSchema) => state.articlesFilters?.search ?? ''
export const getArticlesFiltersOrder = (state: StateSchema) => state.articlesFilters?.order ?? 'asc'
export const getArticlesFiltersSort = (state: StateSchema) => state.articlesFilters?.sort ?? ArticleSortField.CREATED
export const getArticlesFiltersView = (state: StateSchema) => state.articlesFilters?.view || ArticleView.SMALL
export const getArticlesFiltersLimit = (state: StateSchema) => state.articlesFilters?.limit || 9
export const getArticlesFiltersInited = (state: StateSchema) => state.articlesFilters?._inited
export const getArticlesFiltersType = (state: StateSchema) => state.articlesFilters?.type ?? ArticleType.ALL
