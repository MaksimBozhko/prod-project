import { useTranslation } from 'react-i18next';
import classNames, { Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextSize, ThemeText } from '@/shared/ui/Text/Text';
import { Input } from '@/shared/ui/Input/Input';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import { HStack, VStack } from '@/shared/ui/Stack';
import cls from './ProfileCard.module.scss'
import { Profile } from '../../model/types/profile';
import { Card } from '@/shared/ui/Card/Card';
import React, { ChangeEvent } from 'react';
import { Flex } from '@/shared/ui/Stack/Flex/Flex';

interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  error?: string
  readonly?: boolean
  onChangeFirstName?: (value?: string) => void
  onChangeLastName?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
  onChangeCountry?: (country: Country) => void
  onChangeCurrency?: (currency: Currency) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props
  const {t} = useTranslation('profile')

  if (isLoading) {
    return (
      <HStack justify="center" max className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
        <Loader/>
      </HStack>
    )
  }

  if (error) {
    return (
      <HStack justify="center" max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={ThemeText.ERROR}
          title={t('Произошла ошибка при загрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </HStack>
    )
  }

  return (
    <VStack gap="24" max className={classNames(cls.ProfileCard, {}, [className])}>
      <HStack gap='24' align={'start'}>
        {data?.avatar && (
          <Flex justify='center' className={cls.avatarWrapper}>
            <Avatar
              size='100%'
              src={data?.avatar}
              className={cls.avatar}
            />
          </Flex>
        )}
        <VStack gap='24' max>
          <Text
            text={t('Личные данные')}
            size={TextSize.L}
          />
          <HStack gap='16' max>
            <Flex direction={'column'} align='start'>
              <Text
                text={t('Имя')}
                size={TextSize.M}
                theme={ThemeText.INVERTED}
              />
              <Card>
                <Input
                  value={data?.firstname}
                  // placeholder={t('Ваше имя')}
                  className={cls.input}
                  onChange={onChangeFirstName}
                  readonly={readonly}
                  data-testid="ProfileCard.firstname"
                />
              </Card>
            </Flex>
            <Flex direction={'column'} align='start'>
              <Text
                text={t('Фамилия')}
                size={TextSize.M}
                theme={ThemeText.INVERTED}
              />
              <Card>
                <Input
                  value={data?.lastname}
                  // placeholder={t('Ваша фамилия')}
                  className={cls.input}
                  onChange={onChangeLastName}
                  readonly={readonly}
                  data-testid="ProfileCard.lastname"
                />
              </Card>
            </Flex>
          </HStack>
          <HStack gap='16' max>
            <Flex direction={'column'} align='start'>
              <Text
                text={t('Имя пользователя')}
                size={TextSize.M}
                theme={ThemeText.INVERTED}
              />
              <Card>
                <Input
                  value={data?.username}
                  // placeholder={t('Введите имя пользователя')}
                  className={cls.input}
                  onChange={onChangeUsername}
                  readonly={readonly}
                />
              </Card>
            </Flex>
            <Flex direction={'column'} align='start'>
              <Text
                text={t('Возраст')}
                size={TextSize.M}
                theme={ThemeText.INVERTED}
              />
              <Card>
                <Input
                  value={data?.age}
                  // placeholder={t('Ваш возраст')}
                  className={cls.inputAge}
                  onChange={onChangeAge}
                  readonly={readonly}
                />
              </Card>
            </Flex>
          </HStack>
        </VStack>
      </HStack>
      <VStack gap='24'>
        <Text
          text={t('Настройки профиля')}
          size={TextSize.L}
        />
        <HStack gap='24'>
          <Flex direction={'column'} align='start'>
            <Text
              text={t('Аватар')}
              size={TextSize.M}
              theme={ThemeText.INVERTED}
            />
            <Card>
              <Input
                value={data?.avatar}
                // placeholder={t('Введите ссылку на аватар')}
                className={cls.input}
                onChange={onChangeAvatar}
                readonly={readonly}
              />
            </Card>
          </Flex>
          <Flex direction={'column'} align='start'>
            <Text
              text={t('Валюта')}
              size={TextSize.M}
              theme={ThemeText.INVERTED}
            />
            <Card>
              <CurrencySelect
                value={data?.currency}
                className={cls.input}
                onChange={onChangeCurrency}
                readonly={readonly}
              />
            </Card>
          </Flex>
          <Flex direction={'column'} align='start'>
            <Text
              text={t('Страна')}
              size={TextSize.M}
              theme={ThemeText.INVERTED}
            />
            <Card>
              <CountrySelect
                value={data?.country}
                className={cls.input}
                onChange={onChangeCountry}
                readonly={readonly}
              />
            </Card>
          </Flex>
          <Flex direction={'column'} align='start'>
            <Text
              text={t('Город')}
              size={TextSize.M}
              theme={ThemeText.INVERTED}
            />
            <Card>
              <Input
                value={data?.city}
                // placeholder={t('Город')}
                className={cls.input}
                onChange={onChangeCity}
                readonly={readonly}
              />
            </Card>
          </Flex>
        </HStack>
      </VStack>
    </VStack>
  )
}
