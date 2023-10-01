import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { getArticleCreateData } from '@/features/createArticle/model/selectors/createArticleSelector';
import { createArticleActions } from '@/features/createArticle/model/slices/createArticleSlice';
import { getUserAuthData } from '@/entities/User';

export const createArticle = createAsyncThunk<
  any,
  string | undefined,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticleRecommendations',
  async (userId, thunkAPI) => {
    const {
      rejectWithValue,
      extra,
      getState,
      dispatch
    } = thunkAPI

    const article = getArticleCreateData(getState())
    debugger
    // if (userId) {
    //   dispatch(createArticleActions.setRestInfo(userId))
    // }
    try {
      const response = await extra.api.post<Article>('/articles', article)
      console.log(response)
      if (!response.data) {
        throw new Error()
      }
      // return { data: response.data, limit }
    } catch (e) {
      return rejectWithValue('error')
    }
  },
)
