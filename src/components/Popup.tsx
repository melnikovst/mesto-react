import { FC, useEffect } from 'react';

type TProps = {
  children: JSX.Element;
  isOpen: boolean;
  name: string;
  onClose: () => void;
  closeByOverlay: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Popup: FC<TProps> = ({
  children,
  isOpen,
  name,
  onClose,
  closeByOverlay,
}) => {
  const closeByEsc = (e: { key: string }): void => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeByEsc);
    }
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    };
  }, [isOpen]);

  return (
    <div
      onClick={closeByOverlay}
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      {children}
    </div>
  );
};

export default Popup;
