import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList } from 'entities/Article';
import classNames from 'shared/lib/classNames/classNames';
import { useArticleRecommendationsListQuery } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation('article');

  const { data: articles, error, isLoading } = useArticleRecommendationsListQuery(5)

  if (error) {
    return (
      <div className={classNames('', {}, [className])}>
        <Text size={TextSize.L} title={t('ошибка')} />
      </div>
    );
  }

  return (
    <VStack gap="8" className={classNames('', {}, [className])}>
      <Text
        size={TextSize.L}
        title={t('Рекомендуем')}
      />
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        target="_blank"
      />
    </VStack>
  );
});
