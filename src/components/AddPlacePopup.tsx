import { FC, useEffect, useState } from 'react';
import { ICard } from '../utils/utils';
import PopupWithForm from './PopupWithForm';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePlace: (card: { title: string; link: string }) => Promise<void>;
  isAddingLoading: boolean;
  closeByOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const AddPlacePopup: FC<TProps> = ({
  isOpen,
  onClose,
  onUpdatePlace,
  isAddingLoading,
  closeByOverlay,
}) => {
  const [cardName, setCardName] = useState('');
  const [cardPath, setCardPath] = useState('');
  const card = {
    title: cardName,
    link: cardPath,
  };

  const handleCardName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
  };

  const handleCardPath = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardPath(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdatePlace(card);
  };

  useEffect(() => {
    setCardPath('');
    setCardName('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText={`${isAddingLoading ? 'Грузится...' : 'Создать'}`}
      closeByOverlay={closeByOverlay}
    >
      <fieldset className="form__fieldset">
        <input
          type="text"
          className="form__input form__input_type-name"
          name="form-name"
          id="title"
          placeholder="Название"
          required
          minLength={2}
          maxLength={30}
          onChange={handleCardName}
          value={cardName}
        />
        <span className="form__invalid-message title-error"></span>
        <input
          type="url"
          className="form__input form__input_type-link"
          name="form-job"
          id="link"
          placeholder="Ссылка на картинку"
          required
          onChange={handleCardPath}
          value={cardPath}
        />
        <span className="form__invalid-message link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
