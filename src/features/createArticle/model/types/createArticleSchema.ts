import { Article, ArticleType } from '@/entities/Article';

export type ArticleSchema = Omit<Article, 'type'>
export type ArticleSchema1 = Omit<ArticleSchema, 'user'>

export interface CreateArticleSchema extends ArticleSchema1{
  type: ArticleType
}
