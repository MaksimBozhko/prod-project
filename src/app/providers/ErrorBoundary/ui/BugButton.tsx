import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

// тестовая кнопка для проброса ошибки
export const BugButton = () => {
  const [error, setError] = useState(false)
  const { t } = useTranslation('about');

  const onThrow = () => {
    setError(true)
  }

  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  return (
    <Button onClick={onThrow}>
      {t('throw')}
    </Button>
  )
}
