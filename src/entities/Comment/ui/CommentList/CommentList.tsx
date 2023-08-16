import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Comment } from 'entities/Comment';
import { Text, TextAlign, ThemeText } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
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
      <div className={classNames('', {}, [className])}>
        <Text title={error} align={TextAlign.CENTER} theme={ThemeText.ERROR} />
      </div>
    )
  }
  if (isLoading) {
    return (
      <VStack gap="8" max className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    )
  }

  return (
    <VStack gap="16" max className={classNames('', {}, [className])}>
      {comments?.length
        ? comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            isLoading={isLoading}
          />
        ))
        : t('Комментарии отсутствуют')}
    </VStack>
  )
})
