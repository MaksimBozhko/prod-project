import classNames from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import cls from './CreateArticleBlocks.module.scss'
import React, { memo, useCallback, useState } from 'react'
import { ArticleBlockType } from '@/entities/Article';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { ArticleBlock } from '@/entities/Article/model/types/article';
import { Text, TextSize, ThemeText } from '@/shared/ui/Text/Text';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createArticleActions } from '@/features/createArticle/model/slices/createArticleSlice';
import { useSelector } from 'react-redux';
import { getArticleBlocks } from '@/features/createArticle/model/selectors/createArticleSelector';

interface CreateArticleBlocksProps {
  className?: string
}

export const CreateArticleBlocks = memo(({className}: CreateArticleBlocksProps) => {
  const {t} = useTranslation('article')
  const [blocks, setBlocks] = useState<ArticleBlockType[]>([])
  const dispatch = useAppDispatch()

  const articleBlocks = useSelector(getArticleBlocks)

  const onAddBlockHandler = useCallback((type: ArticleBlockType) => {
    setBlocks(prevState => [...prevState, type])
    dispatch(createArticleActions.setNewBlock(type))
  }, [])

  const onChangeBlockTitle = useCallback((title: string, id: number) => {
    // dispatch(createArticleActions.setBlock(value))
    // console.log('111', value, index)
  }, [dispatch])
  const onChangeBlockContent = useCallback((content: string, id: number) => {
    // dispatch(createArticleActions.setBlock(value))
    // console.log('111', value, index)
  }, [dispatch])

  const renderBlock = useCallback((block: ArticleBlock, index: number) => {
    return (
      <Flex direction={'column'} align="start" gap="8">
        <Text
          text={t(`Блок ${block.type}`)}
          size={TextSize.L}
          theme={ThemeText.INVERTED}
        />
        {
          block.type !== ArticleBlockType.CODE
            ? (
              <>
                <Flex direction={'column'} align="start" gap="8">
                  <Text
                    text={t(`Заголовок`)}
                    size={TextSize.L}
                    theme={ThemeText.INVERTED}
                  />
                  <Card>
                    <Input
                      value={''}
                      onChange={(value) => onChangeBlockTitle(value, index)}
                    />
                  </Card>
                </Flex>
                <Flex direction={'column'} align="start" gap="8">
                  <Text
                    text={block.type === ArticleBlockType.TEXT ? t(`Текст`) : t(`Ссылка на картинку`)}
                    size={TextSize.L}
                    theme={ThemeText.INVERTED}
                  />
                  <Card>
                    <Input
                      value={''}
                      onChange={(value) => onChangeBlockContent(value, index)}
                    />
                  </Card>
                </Flex>
              </>
            )
            : <Flex direction={'column'} align="start" gap="8">
              <Text
                text={t(`Вставьте код`)}
                size={TextSize.L}
                theme={ThemeText.INVERTED}
              />
              <Card>
                <Input
                  value={''}
                  onChange={(value) => onChangeBlockContent(value, index)}
                />
              </Card>
            </Flex>
        }
      </Flex>

        )
        // switch (block) {
        //   case ArticleBlockType.CODE:
        //     return (
        //       <ArticleCodeBlockComponent
        //         key={block.id}
        //         className={cls.block}
        //         block={block}
        //       />
        //     )
        //   case ArticleBlockType.IMAGE || ArticleBlockType.TEXT:
        //     return (
        //       <ArticleImageBlockComponent
        //         key={block.id}
        //         className={cls.block}
        //         block={block}
        //       />
        //     )
        //   default:
        //     return null
        // }
      }, [])

        return (
        <div className={classNames(cls.CreateArticleBlocks, {}, [className])}>
          <Flex>
            <Button
              theme={ThemeButton.BACKGROUND_INVERTED}
              onClick={() => onAddBlockHandler(ArticleBlockType.TEXT)}
            >
              {t('Добавить текст')}
            </Button>
            <Button
              theme={ThemeButton.BACKGROUND_INVERTED}
              onClick={() => onAddBlockHandler(ArticleBlockType.CODE)}
            >
              {t('Добавить код')}
            </Button>
            <Button
              theme={ThemeButton.BACKGROUND_INVERTED}
              onClick={() => onAddBlockHandler(ArticleBlockType.IMAGE)}
            >
              {t('Добавить фото')}
            </Button>
          </Flex>
          {blocks && (
            articleBlocks.map(renderBlock)
          )}
        </div>
        )
        })
