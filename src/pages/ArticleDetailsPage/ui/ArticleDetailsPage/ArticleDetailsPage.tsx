import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from '@/shared/lib/classNames/classNames';
import { ArticleDetails } from '@/entities/Article';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page/Page';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '@/pages/ArticleDetailsPage/ui/articleDetailsComments/ArticleDetailsComments';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleRating } from '@/features/articleRating';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import { Breadcrumb, ItemsType } from '@/shared/ui/Breadcrumb/ui/Breadcrumb/Breadcrumb';

interface ArticleDetailsProps {
  className?: string
}

const reducer: ReducerList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = ({className}: ArticleDetailsProps) => {
  const {t} = useTranslation('article')
  const {id} = useParams<{ id: string }>()
  const path = useLocation()
  console.log(path.pathname)

  if (!id) {
    return null;
  }


  return (
    <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
      <Page className={classNames('', {}, [className])}>
        <Flex direction='column' align='normal' gap='16'>
          <ArticleDetailsPageHeader/>
          <ArticleDetails id={id}/>
          <ArticleRating articleId={id}/>
          <ArticleRecommendationsList/>
          <ArticleDetailsComments id={id}/>
        </Flex>
      </Page>
    </DynamicModuleLoader>
  )
}

export default ArticleDetailsPage
