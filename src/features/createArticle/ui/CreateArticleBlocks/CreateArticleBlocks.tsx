import classNames from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import cls from './CreateArticleBlocks.module.scss'
import React, { memo, useCallback } from 'react'
import { ArticleBlockType } from '@/entities/Article';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { ArticleBlock } from '@/entities/Article/model/types/article';
import { Text, TextSize, ThemeText } from '@/shared/ui/Text/Text';
import { Card } from '@/shared/ui/Card/Card';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createArticleActions } from '@/features/createArticle/model/slices/createArticleSlice';
import { useSelector } from 'react-redux';
import { getArticleCreateBlocks } from '@/features/createArticle/model/selectors/createArticleSelector';
import { Textarea } from '@/shared/ui/Textarea/Textarea';

interface CreateArticleBlocksProps {
  className?: string
}

export const CreateArticleBlocks = memo(({className}: CreateArticleBlocksProps) => {
  const {t} = useTranslation('article')
  const dispatch = useAppDispatch()

  const articleBlocks = useSelector(getArticleCreateBlocks)

  const onAddBlockHandler = useCallback((type: ArticleBlockType) => {
    dispatch(createArticleActions.setNewBlock(type))
  }, [])

  const onChangeBlockTitle = useCallback((title: string, id: number) => {
    dispatch(createArticleActions.updateBlockTitle({id, title}))
  }, [dispatch])
  const onChangeBlockContent = useCallback((content: string, id: number) => {
    dispatch(createArticleActions.updateBlockContent({id, content}))
  }, [dispatch])

  const renderBlock = useCallback((block: ArticleBlock, index: number) => {
    return (
      <Flex max direction={'column'} align="start" gap="8">
        <Text
          text={t(`Блок ${block.type}`)}
          size={TextSize.L}
          theme={ThemeText.INVERTED}
        />
        {
          block.type !== ArticleBlockType.CODE
            ? (
              <>
                <Flex max direction={'column'} align="start" gap="8">
                  <Text
                    text={t(`Заголовок`)}
                    size={TextSize.M}
                    theme={ThemeText.INVERTED}
                  />
                  <Card className={cls.inputBlock}>
                    <Textarea
                      value={block.title}
                      onChange={(value) => onChangeBlockTitle(value, index)}
                    />
                  </Card>
                </Flex>
                <Flex max direction={'column'} align="start" gap="8">
                  <Text
                    text={block.type === ArticleBlockType.TEXT ? t(`Текст`) : t(`Ссылка на картинку`)}
                    size={TextSize.M}
                    theme={ThemeText.INVERTED}
                  />
                  <Card className={cls.inputBlock}>
                    <Textarea
                      value={block.type === ArticleBlockType.TEXT ? block.paragraphs : block.src}
                      onChange={(value) => onChangeBlockContent(value, index)}
                    />
                  </Card>
                </Flex>
              </>
            )
            : <Flex max direction={'column'} align="start" gap="8">
              <Text
                text={t(`Вставьте код`)}
                size={TextSize.M}
                theme={ThemeText.INVERTED}
              />
              <Card className={cls.inputBlock}>
                <Textarea
                  value={block.code}
                  onChange={(value) => onChangeBlockContent(value, index)}
                />
              </Card>
            </Flex>
        }
      </Flex>
    )
  }, [])

  return (
    <div className={classNames(cls.CreateArticleBlocks, {}, [className])}>
      <Flex className={cls.addBtns} gap="16">
        <Text text={t('Добавить секцию:')} theme={ThemeText.INVERTED}/>
        <Button
          theme={ThemeButton.BACKGROUND_INVERTED}
          onClick={() => onAddBlockHandler(ArticleBlockType.TEXT)}
        >
          {t('Текст')}
        </Button>
        <Button
          theme={ThemeButton.BACKGROUND_INVERTED}
          onClick={() => onAddBlockHandler(ArticleBlockType.CODE)}
        >
          {t('Код')}
        </Button>
        <Button
          theme={ThemeButton.BACKGROUND_INVERTED}
          onClick={() => onAddBlockHandler(ArticleBlockType.IMAGE)}
        >
          {t('Картинка')}
        </Button>
      </Flex>
      <Flex direction="column" gap="32">
        {articleBlocks && (
          articleBlocks.map(renderBlock)
        )}
      </Flex>
    </div>
  )
})
