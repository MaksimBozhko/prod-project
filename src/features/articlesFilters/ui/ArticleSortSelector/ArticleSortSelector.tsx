import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useMemo } from 'react'
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from '../../model/consts/consts';
import cls from './ArticleSortSelector.module.scss'

interface ArticleSortSelectorProps {
  className?: string
  orderValue: SortOrder
  sortValue: ArticleSortField
  onOrderChange: (value: SortOrder) => void
  onSortChange: (value: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { t } = useTranslation('article')

  const {
    className,
    orderValue,
    sortValue,
    onOrderChange,
    onSortChange,
  } = props

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
    {
      value: 'asc',
      content: t('возрастанию'),
    },
    {
      value: 'desc',
      content: t('убыванию'),
    },
  ], [t])
  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
    {
      value: ArticleSortField.CREATED,
      content: t('дате создания'),
    },
    {
      value: ArticleSortField.TITLE,
      content: t('названию'),
    },
    {
      value: ArticleSortField.VIEWS,
      content: t('просмотрам'),
    },
  ], [t])

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select<SortOrder>
        label={t('Сортировать по')}
        onChange={onOrderChange}
        value={orderValue}
        options={orderOptions}
      />
      <Select<ArticleSortField>
        label={t('по')}
        onChange={onSortChange}
        value={sortValue}
        options={sortFieldOptions}
      />
    </div>
  )
})
