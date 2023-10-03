import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCreateData = (state: StateSchema) => state.createArticle?.article
export const getArticleCreateBlocks = (state: StateSchema) => state.createArticle?.article.blocks || []
export const getArticleCreateIsLoading = (state: StateSchema) => state.createArticle?.isLoading
export const getArticleCreateError = (state: StateSchema) => state.createArticle?.error
