import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { ArticleList } from '@/entities/Article';
import classNames from '@/shared/lib/classNames/classNames';
import { useArticleRecommendationsListQuery } from '../../api/articleRecommendationsApi';
import cls from './ArticleRecommendationsList.module.scss'
import { ArticleTypeTabs } from '@/features/articlesFilters/ui/ArticleTypeTabs/ArticleTypeTabs';
import { typeTabs } from '@/features/articlesFilters/model/consts/consts';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
  const { className } = props;
  const { t } = useTranslation('article');

  const { data: articles, error, isLoading } = useArticleRecommendationsListQuery(5)

  if (isLoading || error || !articles) {
    return (
      <div className={classNames('', {}, [className])}>
        <Text size={TextSize.L} title={t('ошибка')} />
      </div>
    );
  }

  return (
    <Flex
      direction='column'
      align='normal'
      gap='8'
      className={classNames(cls.ArticleRecommendationsList, {}, [className])}
    >
      <Text
        size={TextSize.L}
        title={t('Рекомендуем')}
      />
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        target="_blank"
        className={cls.list}
      />
    </Flex>
  );
});
