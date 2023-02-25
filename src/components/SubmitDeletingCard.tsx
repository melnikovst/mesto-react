import { FC } from 'react';
import PopupWithForm from './PopupWithForm';

type TProps = {
  isOpen: boolean;
  onClose: any;
  onCardDelete: () => Promise<void>;
  isDeletedCardLoading: boolean;
  closeByOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const SubmitDeletingCard: FC<TProps> = ({
  isOpen,
  onClose,
  onCardDelete,
  isDeletedCardLoading,
  closeByOverlay,
}) => {
  const handleDeleteClick = (e: React.FormEvent) => {
    e.preventDefault();
    onCardDelete();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="submit"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleDeleteClick}
      btnText={`${isDeletedCardLoading ? 'Удаляется...' : 'Удалить'}`}
      closeByOverlay={closeByOverlay}
    />
  );
};

export default SubmitDeletingCard;
