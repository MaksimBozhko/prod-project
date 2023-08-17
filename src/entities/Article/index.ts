export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from './model/selectors/articleDetails'

export type { Article } from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'

export { ArticleList } from './ui/ArticleList/ArticleList'
export { ArticleViewSelector } from './ui/ArticleViewSelector/ArticleViewSelector'
export { ArticleType } from 'entities/Article/model/consts/articleConsts';
export { ArticleView } from 'entities/Article/model/consts/articleConsts';
