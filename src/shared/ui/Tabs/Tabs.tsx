import classNames from '@/shared/lib/classNames/classNames'
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import cls from './Tabs.module.scss'
import { useTranslation } from 'react-i18next';

export type TabItem<T extends string> = {
  value: T
  content: string
}

interface TabsProps<T extends string> {
  className?: string
  tabs: TabItem<T>[]
  value: T
  onTabClick: (value: T) => void
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const {
    className,
    tabs,
    value,
    onTabClick,
  } = props

  const {t} = useTranslation('article')

  const clickHandle = (value: string) => () => {
    onTabClick(value as T)
  }

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          key={tab.value}
          onClick={clickHandle(tab.value)}
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={classNames(cls.card, {}, [className])}
        >
          {t(`${tab.content}`)}
        </Card>
      ))}
    </div>
  )
}
