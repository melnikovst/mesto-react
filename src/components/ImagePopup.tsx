import { FC } from 'react';
import { ICard } from '../utils/utils';

type TProps = {
  card: ICard;
  onClose: () => void;
};

const ImagePopup: FC<TProps> = ({ card, onClose }) => {
  return Object.keys(card).length !== 0 ? (
    <figure className="popup__image">
      <img
        src={card.link}
        alt={card.name}
        className="popup__image-item"
        onClick={(e) => e.stopPropagation()}
      />
      <figcaption className="popup__image-subtitle">{card.name}</figcaption>
      <button
        onClick={onClose}
        className="popup__button-escape popup__button-escape_image"
      />
    </figure>
  ) : null;

  // Добавил условный рендеринг, т.к. объект зануляется быстрее, чем происходит анимация закрытия, и видно кнопку закрытия
  // и пустую картинку, некрасиво :)
};

export default ImagePopup;
