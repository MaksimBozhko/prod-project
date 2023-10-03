import { useTranslation } from 'react-i18next'
import { memo, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoBackBtn } from '@/shared/ui/GoBackButton/GoBackBtn';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import classNames from '@/shared/lib/classNames/classNames'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { getArticleDetailsData } from '@/entities/Article';
import { HStack } from '@/shared/ui/Stack';
import { getCanEditArticle } from '../../model/selectors/article';
import cls from './ArticleDetailsPageHeader.module.scss'
import { Breadcrumb, ItemsType } from '@/shared/ui/Breadcrumb/ui/Breadcrumb/Breadcrumb';

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

  const items: ItemsType[] = useMemo(() => ([
    { to: '/articles', label: 'Articles' },
    { to: `/articles?type=${article?.type}`, label: article?.type },
    { to: '', label: article?.title },
  ]),[article])

  return (
    <HStack max justify="between" align='center' className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Breadcrumb items={items} className={cls.btnBack}/>
      {isCanEdit && (
        <Button
          theme={ThemeButton.OUTLINE}
          onClick={onEditArticle}
          className={cls.btnEdit}
        >
          {t('Редактировать')}
        </Button>
      )}
    </HStack>
  )
})
