import { useTranslation } from 'react-i18next'
import { HTMLAttributeAnchorTarget, memo } from 'react'
import classNames from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { ArticleView } from '@/entities/Article/model/consts/articleConsts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleLstItemSkeleton';

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: ArticleView) => {
  return (
    new Array(view === ArticleView.SMALL ? 9 : 3)
      .fill(0)
      .map((item, index) => (
        <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
      ))
  )
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
    target,
  } = props

  const { t } = useTranslation('article')

  const renderArticle = (article: Article) => (
    <ArticleListItem
      key={article.id}
      article={article}
      view={view}
      isLoading={isLoading}
      className={cls.card}
      target={target}
    />
  )

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {
        articles.length
          ? articles.map(renderArticle)
          : null
      }
      {isLoading && getSkeletons(view)}
    </div>
  )
})
