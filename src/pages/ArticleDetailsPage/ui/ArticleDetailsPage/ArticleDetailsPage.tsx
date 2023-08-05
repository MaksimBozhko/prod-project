import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AddCommentForm } from 'features/addCommentForm';
import { useCallback } from 'react';
import { Page } from 'widgets/Page/Page';
import {
  fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { getArticleRecommendations } from '../../model/slices/ArticleDetailsPageRecommendationsSlice';
import { articleDetailsPageReducer } from '../../model/slices';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsError, getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsProps {
  className?: string
}

const reducer: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = ({ className }: ArticleDetailsProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const comments = useSelector(getArticleComments.selectAll)
  const error = useSelector(getArticleCommentsError)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading)

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendations())
  })

  const onSendComment = useCallback((text) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  if (!id) {
    return (
      <Page className={classNames('', {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text
          size={TextSize.L}
          className={cls.commentTitle}
          title={t('Рекомендуем')}
        />
        <ArticleList
          articles={recommendations}
          isLoading={recommendationsIsLoading}
          className={cls.recommendations}
          target="_blank"
        />
        <Text title={t('Комментарии')} className={cls.commentTitle} />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList
          comments={comments}
          isLoading={commentsIsLoading}
          error={error}
        />
      </Page>
    </DynamicModuleLoader>
  )
}

export default ArticleDetailsPage
