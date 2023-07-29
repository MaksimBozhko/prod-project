import { Article } from './article';

export interface ArticleDetailsSchema {
  error?: string
  isLoading: boolean
  data?: Article
}
