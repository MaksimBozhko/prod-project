import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { Article, ArticleView } from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg'
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { ArticleBlockType, ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleLstItem.module.scss'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleItemProps {
  className?: string
  article: Article
  view: ArticleView
  isLoading?: boolean
}

export const ArticleListItem = memo((props: ArticleItemProps) => {
  const {
    className,
    article,
    view,
    isLoading,
  } = props
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onOpenArticle = useCallback(() => {
    navigate(RoutePath.article_details + article.id)
  }, [article.id, navigate])

  const types = <Text text={article.type.join(', ')} className={cls.types} />
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  )

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock
    return (
      <Card id="card" className={classNames(cls.ArticleItem, {}, [className, cls[view], cls.card])}>
        <div className={cls.header}>
          <Avatar size={30} src={article.img} alt={article.title} />
          <Text text={article.user.username} className={cls.username} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <Text title={article.title} className={cls.title} />
        {types}
        <img src={article.img} alt={article.title} className={cls.img} />
        {textBlock && (
          <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
        )}
        <div className={cls.footer}>
          <Button onClick={onOpenArticle} theme={ThemeButton.OUTLINE}>{t('Читать далее...')}</Button>
          {views}
        </div>
      </Card>
    )
  }

  return (
    <Card
      id="card"
      onClick={onOpenArticle}
      className={classNames(cls.ArticleItem, {}, [className, cls[view], cls.card])}
    >
      <div className={cls.imageWrapper}>
        <img src={article.img} alt={article.title} className={cls.img} />
        <Text text={article.createdAt} className={cls.date} />
      </div>
      <div className={cls.infoWrapper}>
        {types}
        {views}
      </div>
      <Text text={article.title} className={cls.title} />
    </Card>
  )
})
