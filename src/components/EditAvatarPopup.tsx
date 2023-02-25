import PopupWithForm from './PopupWithForm';
import { FC, LegacyRef, MutableRefObject, RefObject, useRef } from 'react';
import { IUser } from '../utils/utils';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdateAvatar: (user: IUser) => Promise<void>;
  closeByOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const EditAvatarPopup: FC<TProps> = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  closeByOverlay,
}) => {
  const inputRef = useRef() as RefObject<HTMLInputElement> | null;
  const avatarObj = inputRef!.current;

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarObj!.value,
    });
    setTimeout(() => {
      avatarObj!.value = '';
    }, 1000);
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText="Обновить"
      closeByOverlay={closeByOverlay}
    >
      <fieldset className="form__fieldset">
        <input
          type="url"
          className="form__input form__input_type-name"
          name="form-name"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
          minLength={2}
          ref={inputRef}
        />
        <span className="form__invalid-message avatar-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
