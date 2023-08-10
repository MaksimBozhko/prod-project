import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { LoginModal } from 'features/AuthByUserName';

const AboutPage = () => {
  const { t } = useTranslation('about');

  const [isAuthModal, setIsAuthModal] = useState(false);
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);
  return (
    <Page>
      {t('О сайте')}
      <LoginModal
        isOpen={isAuthModal}
        onClose={onCloseModal}
      />
    </Page>
  );
};

export default AboutPage;
