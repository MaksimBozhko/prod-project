import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import cls from './CreateArticle.module.scss';
import classNames from '@/shared/lib/classNames/classNames';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import { Text, TextSize, ThemeText } from '@/shared/ui/Text/Text';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createArticleActions } from '@/features/createArticle/model/slices/createArticleSlice';
import { useSelector } from 'react-redux';
import { getArticleCreateData } from '@/features/createArticle/model/selectors/createArticleSelector';
import { ArticleTypeTabs } from '@/features/articlesFilters/ui/ArticleTypeTabs/ArticleTypeTabs';
import { ArticleType } from '@/entities/Article';
import { typeTabsCreate } from '@/features/createArticle/model/consts/consts';
import { CreateArticleBlocks } from '@/features/createArticle/ui/CreateArticleBlocks/CreateArticleBlocks';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button/Button';
import { createArticle } from '@/features/createArticle/model/services/createArticle/createArticle';
import { getUserAuthData } from '@/entities/User';

interface CreateArticleProps {
  className?: string;
}

export const CreateArticle = memo((props: CreateArticleProps) => {
  const {className} = props;
  const {t} = useTranslation();
  const dispatch = useAppDispatch()

  const articleData = useSelector(getArticleCreateData)
  const user = useSelector(getUserAuthData)
  console.log(user)

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
    dispatch(createArticleActions.setRestInfo(user?.id!))
    dispatch(createArticle(user?.id))
  }, [dispatch])

  return (
    <div className={classNames(cls.CreateArticle, {}, [className])}>
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
        >
          {t('Сохранить')}
        </Button>
      </Flex>
    </div>
  );
});
