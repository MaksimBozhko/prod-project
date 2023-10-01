import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCreateData = (state: StateSchema) => state.createArticle
export const getArticleCreateBlocks = (state: StateSchema) => state.createArticle?.blocks || []

