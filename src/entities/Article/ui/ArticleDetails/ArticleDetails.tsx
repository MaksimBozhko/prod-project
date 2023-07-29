import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss'
import { getArticleDetailsData, getArticleDetailsError } from '../../model/selectors/articleDetails';

interface ArticleDetailsProps {
  className?: string
  id: string
}

const reducer: ReducerList = {
  articleDetails: articleDetailsReducer,
}

export const ArticleDetails = (props: ArticleDetailsProps) => {
  const {
    className,
    id,
  } = props
  const { t } = useTranslation('article')
  const dispatch = useDispatch()
  // const isLoading = useSelector(getArticleDetailsIsLoading)
  const isLoading = true
  const error = useSelector(getArticleDetailsError)
  const data = useSelector(getArticleDetailsData)

  useEffect(() => {
    dispatch(fetchArticleById(id))
  }, [dispatch, id])

  let content

  if (isLoading) {
    content = (
      <div>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </div>
    )
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t('Произошла ошибка при загрузке статьи')}
      />
    )
  } else {
    content = (
      <div>ArticleDetails</div>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  )
}
