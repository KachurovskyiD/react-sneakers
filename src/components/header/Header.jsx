import { useCart } from '../../hooks/useCart';
import { Link } from "react-router-dom";

import './header.scss';

import logo from '../../assets/img/logo.svg';
import cart from '../../assets/img/cart.svg';
import favourite from '../../assets/img/favourite.svg';
import user from '../../assets/img/user.svg';

const Header = ({ onClickCart }) => {
    const { totalPrice } = useCart()

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <Link className="header__logo" to="/" >
                        <img className="header__logo-icon" src={logo} alt="Logo" />
                        <div className="header__inner">
                            <h2>React Sneakers</h2>
                            <p>Магазин найкращого взуття</p>
                        </div>
                    </Link>
                    <ul className="header__actions">
                        <li className="header__actions-item" onClick={() => onClickCart(true)}>
                            <img className="header__actions-icon" src={cart} alt="Cart" />
                            <span className="header__actions-cart">
                                {totalPrice} грн.
                            </span>
                        </li>
                        <li className="header__actions-item">
                            <Link to="/favourites">
                                <img className="header__actions-icon" src={favourite} alt="Favourite" />
                            </Link>
                        </li>
                        <li className="header__actions-item">
                            <img className="header__actions-icon" src={user} alt="User" />
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;