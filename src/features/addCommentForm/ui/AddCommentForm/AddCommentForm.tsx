import classNames from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormActions, addCommentFormReducer } from 'features/addCommentForm/model/slice/addCommentFormSlice';
import { useSelector } from 'react-redux';
import { getAddCommentsFormText } from 'features/addCommentForm/model/selectors/addCommentsFormSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AddCommentForm.module.scss'

export interface AddCommentFormProps {
  className?: string
  onSendComment: () => void
}

const reducer: ReducerList = {
  addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
  const { t } = useTranslation()
  const text = useSelector(getAddCommentsFormText)
  const dispatch = useAppDispatch()

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch])

  const onSendHandler = useCallback(() => {
    onSendComment()
  }, [onSendComment])

  return (
    <DynamicModuleLoader reducers={reducer}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          className={cls.input}
          value={text}
          onChange={onCommentTextChange}
          placeholder={t('Введите Комментарий')}
        />
        <Button onClick={onSendHandler}>{t('Отправить')}</Button>
      </div>
    </DynamicModuleLoader>
  )
})

export default AddCommentForm
