import classNames from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { useNotificationsQuery } from 'entities/Notification/api/notificationApi';
import { NotificationItem } from 'entities/Notification/ui/NotificationItem/NotificationItem';
import { VStack } from 'shared/ui/Stack';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './NotificationList.module.scss'

interface NotificationListProps {
  className?: string
}

export const NotificationList = memo(({ className }: NotificationListProps) => {
  const { data, isLoading } = useNotificationsQuery(null, {
    pollingInterval: 5000,
  })

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" height="80px" border="8px" />
        <Skeleton width="100%" height="80px" border="8px" />
        <Skeleton width="100%" height="80px" border="8px" />
      </VStack>
    )
  }

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((item) => {
        return <NotificationItem item={item} />
      })}
    </VStack>
  )
})
