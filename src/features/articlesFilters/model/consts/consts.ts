import { useMemo } from 'react';
import { TabItem } from '@/shared/ui/Tabs/Tabs';
import { ArticleType } from '@/entities/Article';
import { useTranslation } from 'react-i18next';

export enum ArticleSortField {
  TITLE = 'title',
  VIEWS = 'views',
  CREATED = 'createdAt'
}



export const typeTabs = [
  {
    value: ArticleType.ALL,
    content: 'все статьи',
  },
  {
    value: ArticleType.IT,
    content: 'айти',
  },
  {
    value: ArticleType.SCIENCE,
    content: 'наука',
  },
  {
    value: ArticleType.ECONOMICS,
    content: 'экономика',
  },
  {
    value: ArticleType.ARTIFICIAL_INTELLIGENCE,
    content: 'искусственный интеллект',
  },
  {
    value: ArticleType.ART,
    content: 'искусство',
  },
  {
    value: ArticleType.ENVIRONMENT,
    content: 'окружение',
  },
]
