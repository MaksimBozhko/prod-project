import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { getArticleCreateData } from '@/features/createArticle/model/selectors/createArticleSelector';

export const fetchCreateArticle = createAsyncThunk<
  any,
  string | undefined,
  ThunkConfig<string>
>(
  'articlesCreatePage/fetchCreateArticle',
  async (userId, thunkAPI) => {
    const {
      rejectWithValue,
      extra,
      getState,
    } = thunkAPI

    const article = getArticleCreateData(getState())

    try {
      const response = await extra.api.post<Article>('/articles', article)
      if (!response.data) {
        throw new Error()
      }
    } catch (e) {
      return rejectWithValue('error')
    }
  },
)
