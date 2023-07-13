import classNames from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from 'features/AuthByUserName/ui/LoginForm/LoginForm';

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={classNames('', {}, [className])}
      lazy
    >
      <LoginForm />
    </Modal>
  )
}
