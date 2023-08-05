import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useMemo } from 'react'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from 'entities/Article';

interface ArticleTypeTabsProps {
  className?: string
  value: ArticleType
  onTypeChanged: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const {
    className,
    onTypeChanged,
    value,
  } = props
  const { t } = useTranslation('article')

  const typeTabs = useMemo<TabItem<ArticleType>[]>(() => [
    {
      value: ArticleType.ALL,
      content: t('все статьи'),
    },
    {
      value: ArticleType.IT,
      content: t('айти'),
    },
    {
      value: ArticleType.SCIENCE,
      content: t('наука'),
    },
    {
      value: ArticleType.ECONOMICS,
      content: t('экономика'),
    },
    {
      value: ArticleType.ARTIFICIAL_INTELLIGENCE,
      content: t('искусственный интеллект'),
    },
    {
      value: ArticleType.ART,
      content: t('искусство'),
    },
    {
      value: ArticleType.ENVIRONMENT,
      content: t('окружение'),
    },
  ], [t])

  return (
    <Tabs
      tabs={typeTabs}
      value={value}
      onTabClick={onTypeChanged}
      className={classNames('', {}, [className])}
    />
  )
})
