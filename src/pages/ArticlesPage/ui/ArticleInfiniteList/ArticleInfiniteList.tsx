import { useTranslation } from 'react-i18next';
import { ArticleList } from 'entities/Article';
import { useSelector } from 'react-redux';
import { getArticlesFiltersView } from 'features/articlesFilters';
import { Text } from 'shared/ui/Text/Text';
import { getArticlesError, getArticlesIsLoading } from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/ArticlesPageSlice';

interface Props {
  className?: string
}

export const ArticleInfiniteList = ({ className }: Props) => {
  const { t } = useTranslation('article')

  const isLoading = useSelector(getArticlesIsLoading)
  const view = useSelector(getArticlesFiltersView)
  const articles = useSelector(getArticles.selectAll)
  const error = useSelector(getArticlesError)

  if (error) {
    return <Text title={t('Произошла ошибка при загрузке статей')} text={t('Попробуйте позже)')} />
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
    />
  )
}
