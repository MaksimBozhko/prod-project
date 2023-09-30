import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleData = (state: StateSchema) => state.createArticle
export const getArticleBlocks = (state: StateSchema) => state.createArticle?.blocks || []

