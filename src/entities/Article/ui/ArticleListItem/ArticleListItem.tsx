import { useTranslation } from 'react-i18next'
import { HTMLAttributeAnchorTarget, memo } from 'react'
import classNames from '@/shared/lib/classNames/classNames'
import { Article, ArticleView } from '@/entities/Article';
import { Text } from '@/shared/ui/Text/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { Icon } from '@/shared/ui/Icon/Icon';
import { Card } from '@/shared/ui/Card/Card';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { ArticleBlockType } from '@/entities/Article/model/consts/articleConsts';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleLstItem.module.scss'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleItemProps {
  className?: string
  article: Article
  view: ArticleView
  isLoading?: boolean
  target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleItemProps) => {
  const {
    className,
    article,
    view,
    isLoading,
    target,
  } = props
  const { t } = useTranslation()

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
          <AppLink to={RoutePath.article_details + article.id}>
            <Button theme={ThemeButton.OUTLINE}>{t('Читать далее...')}</Button>
          </AppLink>
          {views}
        </div>
      </Card>
    )
  }

  return (
    <AppLink target={target} to={RoutePath.article_details + article.id} className={classNames(cls.smallView, {}, [className, cls[view], cls.card])}>
      <Card
        max
        id="card"
        className={classNames(cls.ArticleItem, {})}
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
    </AppLink>
  )
})
