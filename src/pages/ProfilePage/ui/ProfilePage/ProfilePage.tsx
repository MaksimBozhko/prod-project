import React from 'react';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { EditableProfileCard } from 'features/editableProfileCard';

const ProfilePage = () => {
  const { t } = useTranslation('profile')
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <Text text={t('Профиль не найден')} />
  }

  return (
    <Page>
      <EditableProfileCard id={id} />
    </Page>
  );
};

export default ProfilePage;
