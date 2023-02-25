import updateProfileInfoBtn from '../images/Vector.svg';
import addCardBtn from '../images/Vector2.svg';
import Card from './Card';
import { FC, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Loader from './Loader';
import Error from './Error';
import { ICard } from '../utils/utils';

type TProps = {
  onEditProfile: () => void;
  onAddPlace: () => void;
  onEditAvatar: () => void;
  onCardClick: (card: ICard) => void;
  cards: ICard[];
  onCardLike: (card: ICard) => Promise<void>;
  onCardDelete: (card: { name: string; link: string }) => Promise<void>;
  isLoading: boolean;
  error: boolean;
  openDeletingPopup: (card: ICard) => void;
};

const Main: FC<TProps> = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  isLoading,
  error,
  openDeletingPopup,
}) => {
  const profileContext = useContext(CurrentUserContext);
  const { avatar, name, about } = profileContext;
  const avatarClasses = `spinner ${isLoading ? 'spinner_visible' : ''}`;
  const profileImgClasses = `profile__image ${
    isLoading ? 'profile__image_while_loading' : ''
  }`;
  console.log(name);

  if (error) {
    return <Error />;
  }

  if (avatar === undefined) {
    return <Loader />;
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__wrapper">
          <div onClick={onEditAvatar} className="profile__avatar-container">
            <div className={avatarClasses}></div>
            <img
              src={avatar}
              alt="Что-то пошло не так :("
              className={profileImgClasses}
            />
            <div className="profile__substrate"></div>
          </div>
          <div className="profile__text-wrapper">
            <div className="profile__title-container">
              <h1 className="profile__title">{name}</h1>
              <button
                type="button"
                aria-label="Редактировать профиль"
                className="profile__title-button"
                onClick={onEditProfile}
              >
                <img
                  src={updateProfileInfoBtn}
                  alt="Кнопка Редактировать"
                  className="profile__title-button-vector"
                />
              </button>
            </div>
            <p className="profile__subtitle">{about}</p>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__button"
            onClick={onAddPlace}
          >
            <img
              src={addCardBtn}
              alt="Кнопка профиля"
              className="profile__button-vector"
            />
          </button>
        </div>
      </section>
      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              onCardClick={onCardClick}
              key={card._id}
              card={card}
              user={profileContext}
              onCardLike={onCardLike}
              openDeletingPopup={openDeletingPopup}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
