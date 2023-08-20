import { useTranslation } from 'react-i18next'
import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect';
import classNames from '@/shared/lib/classNames/classNames'
import cls from './RatingCard.module.scss'
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Drawer } from '@/shared/ui/Drawer/Drawer';

interface RatingCardProps {
  className?: string
  title: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (startsCount: number) => void
  onAccept?: (startsCount: number, feedback?: string) => void
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onAccept,
    onCancel,
  } = props
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStarsCount] = useState(0)
  const [feedback, setFeedback] = useState('')

  const onSelectStarts = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount)
    if (hasFeedback) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStarsCount)
    }
  }, [hasFeedback, onAccept])

  const onCancelHandler = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const onAcceptHandler = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        placeholder={t('Ваш отзыв')}
        value={feedback}
        onChange={setFeedback}
      />
    </>
  )

  return (
    <Card className={classNames(cls.RatingCard, {}, [className])}>
      <VStack max gap="8" align="center">
        <Text title={title} />
        <StarRating size={40} onSelect={onSelectStarts} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack max gap="32">
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button
                theme={ThemeButton.OUTLINE_RED}
                onClick={onCancelHandler}
              >
                {t('Закрыть')}
              </Button>
              <Button
                onClick={onAcceptHandler}
              >
                {t('Отправить')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={onCancelHandler}>
          <VStack max gap="32">
            {modalContent}
            <Button
              fullWidth
              onClick={onAcceptHandler}
              size={ButtonSize.L}
            >
              {t('Отправить')}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>

    </Card>
  )
})
