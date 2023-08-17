import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { Text } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/addCommentForm';
import { CommentList } from 'entities/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import { getArticleComments } from '../../model/slices/ArticleDetailsCommentsSlice';
import { getArticleCommentsError, getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsCommentsProps {
  className?: string
  id?: string
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {
  const { t } = useTranslation('article')

  const dispatch = useDispatch()
  const comments = useSelector(getArticleComments.selectAll)
  const error = useSelector(getArticleCommentsError)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text))
  }, [dispatch])

  return (
    <VStack gap="8" max className={classNames('', {}, [className])}>
      <Text title={t('Комментарии')} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList
        comments={comments}
        isLoading={commentsIsLoading}
        error={error}
      />
    </VStack>
  )
})
