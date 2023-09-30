import { memo } from 'react'
import classNames from '@/shared/lib/classNames/classNames'
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs'
import { ArticleType } from '@/entities/Article';

interface ArticleTypeTabsProps {
  className?: string
  value: ArticleType
  onTypeChanged: (type: ArticleType) => void
  tabs: TabItem<ArticleType>[]
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const {
    className,
    onTypeChanged,
    value,
    tabs,
  } = props

  return (
    <Tabs
      tabs={tabs}
      value={value}
      onTabClick={onTypeChanged}
      className={classNames('', {}, [className])}
    />
  )
})
