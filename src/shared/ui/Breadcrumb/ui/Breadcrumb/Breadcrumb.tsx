import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import ArrowLeftIcon from '../../../../assets/icons/arrowleft.svg'
import cls from './Breadcrumb.module.scss'

export type ItemsType = {
  to: string
  label?: string
}

interface BreadcrumbProps {
  separator?: string
  items: ItemsType[]
  className?: string
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon/Icon';
import classNames from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export const Breadcrumb = ({separator = '/', items, className}: BreadcrumbProps) => {
  const children = items.reduce((acc, child, index) => {
    if (index) {
      acc.push({...child, separator: separator})
    } else {
      acc.push(child)
    }
    return acc
  }, [] as any)
  console.log('bread', items)
  if (!items[items.length - 1].label) return <Skeleton width='330px' height='24px'/>

  return <Flex gap='8' align='center' className={classNames(cls.Breadcrumb, {}, [className])}>
    <Icon Svg={ArrowLeftIcon} />
    <Flex direction='row' gap={'4'}>
      {children.map(({ to, label, separator }: any) => (
        <>
          {separator}
          <Link key={to} to={to} className={cls.text}>
            <Text text={label}/>
          </Link>
        </>
      ))}
    </Flex>
  </Flex>
}
