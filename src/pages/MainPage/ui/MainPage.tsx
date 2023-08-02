import React from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';
import { Page } from 'shared/ui/Page/Page';

const MainPage = () => {
  const { t } = useTranslation('main');

  return (
    <Page>
      <BugButton />
      {t('Главная страница')}
    </Page>
  );
};

export default MainPage;
