import { SortOrder } from 'shared/types';
import { ArticleView, ArticleType } from 'entities/Article';

export enum ArticleSortField {
  TITLE = 'title',
  VIEWS = 'views',
  CREATED = 'createdAt'
}

export interface ArticlesFiltersSchema {
  order: SortOrder
  sort: ArticleSortField
  search: string
  view: ArticleView
  type: ArticleType
  limit?: number
  _inited?: boolean
}
