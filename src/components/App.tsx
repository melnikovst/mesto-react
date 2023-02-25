import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Popup from './Popup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { server } from '../utils/api';
import { useEffect, useState } from 'react';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitDeletingCard from './SubmitDeletingCard';
import { ICard, IUser } from '../utils/utils';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState<boolean>(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] =
    useState<boolean>(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<ICard>({
    name: '',
    link: '',
  });
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<Partial<{ _id: string }>>({});
  const [cards, setCards] = useState<ICard[]>([]);
  const [isAvatarLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isDeletingPopupOpen, setIsDeletingPopupOpen] =
    useState<boolean>(false);
  const [cardDel, setCard] = useState<Partial<ICard>>({});
  const [isDeletedCardLoading, setIsDeletedCardLoading] =
    useState<boolean>(false);
  const [isAddingLoading, setIsAddingLoading] = useState<boolean>(false);
  const { _id } = currentUser;

  const openDeletingPopup = (card: ICard) => {
    setIsDeletingPopupOpen(true);
    setCard(card);
  };

  const handleAddPlaceSubmit = async (obj: { title: string; link: string }) => {
    setIsAddingLoading(true);
    try {
      const resAdding = await server.addCard(obj);
      setCards([resAdding, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsAddingLoading(false);
      }, 500);
    }
  };

  const handleCardLike = async (card: ICard) => {
    const isLiked = card.likes?.some((i) => i._id === _id);
    try {
      const resChangeLikeStatus = await server.changeLikeCardStatus(
        card,
        !isLiked
      );
      setCards((state) =>
        state.map((c) => (c._id === card._id ? resChangeLikeStatus : c))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleting = async () => {
    setIsDeletedCardLoading(true);
    try {
      await server.deleteCard(cardDel);
      setCards((newArray) =>
        newArray.filter((item) => cardDel._id !== item._id)
      );
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsDeletedCardLoading(false);
      }, 500);
    }
  };

  const fetchData = async () => {
    try {
      const [profileObject, cards] = await Promise.all([
        server.loadProfile(),
        server.loadCards(),
      ]);
      setCards(cards);
      setCurrentUser(profileObject);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const closeAllPopups = () => {
    setIsImageOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setTimeout(() => setSelectedCard({ name: '', link: '' }), 300);
    setIsDeletingPopupOpen(false);
  };

  const handleCardClick = (card: ICard) => {
    setIsImageOpen(true);
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeByOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  const handleUpdateUser = async (object: IUser) => {
    try {
      const resChangingProfile = await server.changeProfile(object);
      setCurrentUser(resChangingProfile);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAvatar = async (object: IUser) => {
    setIsLoading(true);
    try {
      const resAvatar = await server.setNewAvatar(object);
      setCurrentUser(resAvatar);
      closeAllPopups();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleting}
            isLoading={isAvatarLoading}
            error={error}
            openDeletingPopup={openDeletingPopup}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            closeByOverlay={closeByOverlay}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdatePlace={handleAddPlaceSubmit}
            isAddingLoading={isAddingLoading}
            closeByOverlay={closeByOverlay}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            closeByOverlay={closeByOverlay}
          />
          <SubmitDeletingCard
            onClose={closeAllPopups}
            onCardDelete={handleDeleting}
            isDeletedCardLoading={isDeletedCardLoading}
            closeByOverlay={closeByOverlay}
            isOpen={isDeletingPopupOpen}
          />
          <Popup
            name="picture"
            isOpen={isImageOpen}
            onClose={closeAllPopups}
            closeByOverlay={closeByOverlay}
          >
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </Popup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
