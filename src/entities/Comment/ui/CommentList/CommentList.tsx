import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Comment } from 'entities/Comment';
import { Text, TextAlign, ThemeText } from 'shared/ui/Text/Text';
import cls from './CommentList.module.scss'
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
  error?: string
}

export const CommentList = memo((props: CommentListProps) => {
  const {
    className, comments, isLoading, error,
  } = props
  const { t } = useTranslation()

  if (error) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <Text title={error} align={TextAlign.CENTER} theme={ThemeText.ERROR} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    )
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            key={comment.id}
            className={cls.comment}
            comment={comment}
            isLoading={isLoading}
          />
        ))
        : t('Комментарии отсутствуют')}
    </div>
  )
})
