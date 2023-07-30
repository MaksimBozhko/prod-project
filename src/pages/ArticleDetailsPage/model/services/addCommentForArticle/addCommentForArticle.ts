import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails';

export const addCommentForArticle = createAsyncThunk<
  void,
  string,
  ThunkConfig<string>
>(
  'articleDetails/addCommentForArticle',
  async (text, thunkApi) => {
    const {
      extra, dispatch, rejectWithValue, getState,
    } = thunkApi;

    const article = getArticleDetailsData(getState())
    const userData = getUserAuthData(getState())

    if (!article || !userData || !text) {
      return rejectWithValue('no data');
    }

    try {
      const response = await extra.api.post('/comments', {
        params: {
          articleId: article?.id,
          userId: userData?.id,
          text,
        },
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
