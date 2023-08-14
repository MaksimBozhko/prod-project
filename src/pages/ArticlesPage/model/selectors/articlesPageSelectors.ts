import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false
export const getArticlesError = (state: StateSchema) => state.articlesPage?.error
export const getArticlesPage = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlesHasMore = (state: StateSchema) => state.articlesPage?.hasMore
