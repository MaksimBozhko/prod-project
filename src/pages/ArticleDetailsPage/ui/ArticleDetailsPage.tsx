import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment/ui/CommentList/CommentList';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from 'pages/ArticleDetailsPage/model/slices/ArticleDetailsCommentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  getArticleCommentsError,
  getArticleCommentsIsLoading,
} from 'pages/ArticleDetailsPage/model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';
import cls from './ArticleDetailsPage.module.scss'

interface ArticleDetailsProps {
  className?: string
}

const reducer: ReducerList = {
  articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage = ({ className }: ArticleDetailsProps) => {
  const { t } = useTranslation('article')
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const comments = useSelector(getArticleComments.selectAll)
  const error = useSelector(getArticleCommentsError)
  const isLoading = useSelector(getArticleCommentsIsLoading)

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  if (!id) {
    return (
      <div className={classNames('', {}, [className])}>
        {t('Статья не найдена')}
      </div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={t('Комментарии')} className={cls.commentTitle} />
        <CommentList
          comments={comments}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </DynamicModuleLoader>
  )
}

export default ArticleDetailsPage
