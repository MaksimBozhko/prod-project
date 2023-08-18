import classNames from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { Notification } from 'entities/Notification/model/types/notification';
import { Text } from 'shared/ui/Text/Text';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import cls from './NotificationItem.module.scss'

interface NotificationItemProps {
  className?: string
  item: Notification
}

export const NotificationItem = memo(({ className, item }: NotificationItemProps) => {
  const content = (
    <Card
      theme={CardTheme.OUTLINED}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  )

  if (item.href) {
    return (
      <a className={cls.link} target="_blank" href={item.href} rel="noreferrer">
        {content}
      </a>
    )
  }

  return content
})
