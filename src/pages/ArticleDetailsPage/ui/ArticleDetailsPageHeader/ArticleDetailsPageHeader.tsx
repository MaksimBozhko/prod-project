import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoBackBtn } from '@/shared/ui/GoBackButton/GoBackBtn';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import classNames from '@/shared/lib/classNames/classNames'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = memo(({ className }: ArticleDetailsPageHeaderProps) => {
  const { t } = useTranslation('article')

  const navigate = useNavigate()

  const isCanEdit = useSelector(getCanEditArticle)
  const article = useSelector(getArticleDetailsData)

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`)
  }, [article?.id, navigate])

  return (
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <GoBackBtn>{t('Вернуться назад')}</GoBackBtn>
      {isCanEdit && (
        <Button
          theme={ThemeButton.OUTLINE}
          onClick={onEditArticle}
        >
          {t('Редактировать')}
        </Button>
      )}
    </HStack>
  )
})
