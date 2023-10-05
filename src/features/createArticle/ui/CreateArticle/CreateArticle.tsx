import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect, useState } from 'react';
import cls from './CreateArticle.module.scss';
import classNames from '@/shared/lib/classNames/classNames';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import { Text, TextAlign, TextSize, ThemeText } from '@/shared/ui/Text/Text';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createArticleActions, createArticleReducer } from '@/features/createArticle/model/slices/createArticleSlice';
import { useSelector } from 'react-redux';
import {
  getArticleCreateData,
  getArticleCreateError,
  getArticleCreateIsLoading
} from '@/features/createArticle/model/selectors/createArticleSelector';
import { ArticleTypeTabs } from '@/features/articlesFilters/ui/ArticleTypeTabs/ArticleTypeTabs';
import { ArticleType } from '@/entities/Article';
import { typeTabsCreate } from '@/features/createArticle/model/consts/consts';
import { CreateArticleBlocks } from '@/features/createArticle/ui/CreateArticleBlocks/CreateArticleBlocks';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button/Button';
import { fetchCreateArticle } from '@/features/createArticle/model/services/createArticle/fetchCreateArticle';
import { getUserAuthData } from '@/entities/User';
import { fetchArticleById } from '@/entities/Article/model/services/fetchArticleById/fetchArticleById';
import { fetchEditArticle } from '@/features/createArticle/model/services/editArticle/fetchEditArticle';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Loader } from '@/shared/ui/Loader/Loader';

const reducer: ReducerList = {
  createArticle: createArticleReducer,
}

interface CreateArticleProps {
  className?: string;
  id?: string
}

export const CreateArticle = memo((props: CreateArticleProps) => {
  const {className, id} = props;
  const {t} = useTranslation();
  const dispatch = useAppDispatch()
  const [modalView, setModalView] = useState<boolean>(false)

  const articleData = useSelector(getArticleCreateData)
  const error = useSelector(getArticleCreateError)
  const isLoading = useSelector(getArticleCreateIsLoading)
  const user = useSelector(getUserAuthData)

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id))
    }
  }, [dispatch, id])

  const viewModalHandler = useCallback(() => {
    // setModalView(true)
  }, [])

  const onChangeTitle = useCallback((value?: string) => {
    dispatch(createArticleActions.setTitle(value || ''))
  }, [dispatch])

  const onChangeSubTitle = useCallback((value?: string) => {
    dispatch(createArticleActions.setSubTitle(value || ''))
  }, [dispatch])

  const onChangeImg = useCallback((value?: string) => {
    dispatch(createArticleActions.setImg(value || ''))
  }, [dispatch])

  const onChangeType = useCallback((value: ArticleType) => {
    dispatch(createArticleActions.setType(value))
  }, [dispatch])

  const onCreateArticleHandler = useCallback(() => {
    if (id) {
      dispatch(fetchEditArticle(id)).then(viewModalHandler)
    } else {
      dispatch(createArticleActions.setRestInfo(user?.id!))
      dispatch(fetchCreateArticle(user?.id)).then(viewModalHandler)
    }
  }, [dispatch])

  let content
  if (isLoading) {
    content = (
      <>
        <HStack gap="32" className={cls.skeletons}>
          <VStack gap="24" max>
            <Skeleton width="80%" height={54}/>
            <Skeleton width="80%" height={54}/>
            <Skeleton width="80%" height={54}/>
            <Skeleton width="80%" height={54}/>
          </VStack>
          <Skeleton width={200} height={300}/>
        </HStack>
        <Skeleton className={cls.skeletonLine} width={350} height={65}/>
      </>
    )
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t('Произошла ошибка при загрузке')}
      />
    )
  } else {
    content = (
      <>
        <HStack>
          <VStack
            gap="16"
            max
            className={cls.articleInfo}
          >
            <Flex max direction={'column'} align="start" gap="8">
              <Text
                text={t('Заголовок')}
                size={TextSize.M}
                theme={ThemeText.INVERTED}
              />
              <Card className={cls.cardInputInfo}>
                <Input
                  value={articleData?.title}
                  onChange={onChangeTitle}
                />
              </Card>
            </Flex>
            <Flex max direction={'column'} align="start" gap="8">
              <Text
                text={t('Подзаголовок')}
                size={TextSize.M}
                theme={ThemeText.INVERTED}
              />
              <Card className={cls.cardInputInfo}>
                <Input
                  value={articleData?.subtitle}
                  onChange={onChangeSubTitle}
                />
              </Card>
            </Flex>
            <Flex max direction={'column'} align="start" gap="8">
              <Text
                text={t('Ссылка на картинку')}
                size={TextSize.M}
                theme={ThemeText.INVERTED}
              />
              <Card className={cls.cardInputInfo}>
                <Input
                  value={articleData?.img}
                  onChange={onChangeImg}
                />
              </Card>
            </Flex>
          </VStack>
          <VStack
            gap="8"
            className={cls.blockType}
          >
            <Text
              text={t('Статья на тему')}
              size={TextSize.M}
              theme={ThemeText.INVERTED}
            />
            <ArticleTypeTabs
              value={articleData?.type!}
              onTypeChanged={onChangeType}
              className={cls.tabs}
              tabs={typeTabsCreate}
            />
          </VStack>
        </HStack>
        <CreateArticleBlocks/>
        <Flex max>
          <Button
            size={ButtonSize.L}
            theme={ThemeButton.BACKGROUND_INVERTED}
            className={cls.btnSave}
            onClick={onCreateArticleHandler}
            disabled={isLoading}
          >
            {isLoading ? <Loader/> :
              id ? t('Сохранить') : t('Создать')}
          </Button>
        </Flex>
      </>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducer}>
      <div className={classNames(cls.CreateArticle, {}, [className])}>
        {content}
      </div>
      { modalView && (
        <Modal isOpen={modalView}>
          modal content
        </Modal>
      )}
    </DynamicModuleLoader>
  );
});
