import classNames from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Currency } from 'entities/Currency';
import { useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
]

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

export const CurrencySelect = (props: CurrencySelectProps) => {
  const { t } = useTranslation()

  const {
    className,
    value = Currency.EUR,
    onChange, readonly,
  } = props

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency);
  }, [onChange]);

  return (
    <ListBox
      readonly={readonly}
      items={options}
      className={classNames('', {}, [className])}
      value={value}
      onChange={onChangeHandler}
      label={t('Укажите валюту')}
    />
  )
}
