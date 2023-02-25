import { FC } from 'react';
import Popup from './Popup';

type TProps = {
  title: string;
  children?: JSX.Element;
  onClose: () => void;
  onSubmit: (e: React.MouseEvent<HTMLFormElement>) => void;
  name: string;
  isOpen: boolean;
  closeByOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
  btnText: string;
};

const PopupWithForm: FC<TProps> = ({
  title,
  children,
  onClose,
  onSubmit,
  btnText,
  name,
  isOpen,
  closeByOverlay,
}) => {
  return (
    <Popup
      name={name}
      onClose={onClose}
      isOpen={isOpen}
      closeByOverlay={closeByOverlay}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
          className="popup__button-escape popup__button-escape_card"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className="form form_popup_template"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            id="card-button"
            aria-label="Создать"
            className="form__button"
          >
            {btnText}
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default PopupWithForm;
