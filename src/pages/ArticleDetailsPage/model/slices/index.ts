import { combineReducers } from '@reduxjs/toolkit';
import {
  articleDetailsPageRecommendationsReducer,
} from '@/pages/ArticleDetailsPage/model/slices/ArticleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from '@/pages/ArticleDetailsPage/model/slices/ArticleDetailsCommentsSlice';

export const articleDetailsPageReducer = combineReducers({
  recommendations: articleDetailsPageRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
})
