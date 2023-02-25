import logo from '../images/logo-header.svg';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Логотип в шапке сайта" className="logo" />
    </header>
  );
};

export default Header;
