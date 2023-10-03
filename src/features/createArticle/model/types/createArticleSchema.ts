import { Article, ArticleType } from '@/entities/Article';

export interface CreateArticleSchema{
  article: Article
  isLoading?: boolean
  error?: string
}
