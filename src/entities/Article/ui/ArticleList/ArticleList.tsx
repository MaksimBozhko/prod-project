import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Article, ArticleView } from 'entities/Article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import cls from './ArticleList.module.scss'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleLstItemSkeleton';

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
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
  } = props

  const { t } = useTranslation('article')

  const renderArticle = (article: Article) => (
    <ArticleListItem
      key={article.id}
      article={article}
      view={view}
      isLoading={isLoading}
      className={cls.card}
    />
  )

  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    )
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {
        articles.length
          ? articles.map(renderArticle)
          : t('Статей не найдено')
      }
    </div>
  )
})
