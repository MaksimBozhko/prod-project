import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { getIsProfilePageCanEdit } from '../../model/selectors/getProfilePageCanEdit/getProfilePageCanEdit';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

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
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Text title={t('Профиль')} />
      {isCanEdit && (
        <div>
          {readonly
            ? (
              <Button
                theme={ThemeButton.OUTLINE}
                onClick={onEdit}
              >
                {t('Редактировать')}
              </Button>
            )
            : (
              <HStack gap="8">
                <Button
                  theme={ThemeButton.OUTLINE_RED}
                  onClick={onCancelEdit}
                >
                  {t('Отменить')}
                </Button>
                <Button
                  theme={ThemeButton.OUTLINE}
                  onClick={onSave}
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
