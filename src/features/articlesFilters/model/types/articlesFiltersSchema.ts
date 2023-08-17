import { SortOrder } from 'shared/types';
import { ArticleType, ArticleView } from 'entities/Article';
import { ArticleSortField } from '../consts/consts';

export interface ArticlesFiltersSchema {
  order: SortOrder
  sort: ArticleSortField
  search: string
  view: ArticleView
  type: ArticleType
  limit?: number
  _inited?: boolean
}
