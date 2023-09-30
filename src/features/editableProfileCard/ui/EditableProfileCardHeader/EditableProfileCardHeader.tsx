import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import classNames from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { getIsProfilePageCanEdit } from '../../model/selectors/getProfilePageCanEdit/getProfilePageCanEdit';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import cls from './EditableProfileCardHeader.module.scss';

interface EditableProfileCardHeaderProps {
  className?: string
}

export const EditableProfileCardHeader = memo(({ className }: EditableProfileCardHeaderProps) => {
  const { t } = useTranslation('profile')

  const dispatch = useAppDispatch()
  const readonly = useSelector(getProfileReadonly)
  const isCanEdit = useSelector(getIsProfilePageCanEdit)

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])

  return (
    <HStack max justify="between" className={classNames(cls.EditableProfileCardHeader, {}, [className])}>
      <Text title={t('Профиль')} size={TextSize.L} className={cls.title} />
      {isCanEdit && (
        <div>
          {readonly
            ? (
              <Button
                theme={ThemeButton.OUTLINE}
                onClick={onEdit}
                data-testid="EditableProfileCardHeader.EditButton"
              >
                {t('Редактировать')}
              </Button>
            )
            : (
              <HStack gap="8">
                <Button
                  theme={ThemeButton.OUTLINE_RED}
                  onClick={onCancelEdit}
                  data-testid="EditableProfileCardHeader.CancelButton"
                >
                  {t('Отменить')}
                </Button>
                <Button
                  theme={ThemeButton.BACKGROUND_INVERTED}
                  onClick={onSave}
                  data-testid="EditableProfileCardHeader.SaveButton"
                >
                  {t('Сохранить')}
                </Button>
              </HStack>
            )}
        </div>
      )}
    </HStack>
  )
})
