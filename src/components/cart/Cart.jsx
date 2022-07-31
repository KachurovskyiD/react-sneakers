import { CSSTransition } from 'react-transition-group';
import { useCart } from '../../hooks/useCart';

import './cart.scss';

import close from '../../assets/img/close.svg';
import arrowRight from '../../assets/img/arrow-right.svg';
import empty from '../../assets/img/empty.png';

const Cart = ({ show, onCloseCart, items = [], onRemoveFromCart }) => {
    const duration = 300;
    const { totalPrice } = useCart()
    console.log(items);
    return (
        <CSSTransition
            in={show}
            timeout={duration}
            classNames="cart-animation"
            mountOnEnter
            unmountOnExit>
            <div className="cart">
                <div className="cart__wrapper">
                    <p className="cart__title">Кошик</p>
                    {items.length > 0 ?
                        <>
                            <div className="cart__items">
                                {items.map((item) => (
                                    <div className="cart__item" key={item.id}>
                                        <img className="cart__item-img" src={item.imgUrl} alt="Order" />
                                        <div className="cart__item-description">
                                            <p>{item.title}</p>
                                            <span>{item.price} грн.</span>
                                        </div>
                                        <img className="cart__item-delete" src={close} onClick={() => onRemoveFromCart(item.id)} alt="Delete order" />
                                    </div>
                                ))}
                            </div>
                            <ul className="cart__total">
                                <li>
                                    <p>Усього:</p>
                                    <div></div>
                                    <span>{totalPrice} грн.</span>
                                </li>
                                <li>
                                    <p>Податок 5%:</p>
                                    <div></div>
                                    <span>{Math.round(totalPrice * 0.05)} грн.</span>
                                </li>
                            </ul>
                            <button className="cart__btn button">
                                Оформити замовлення
                                <img src={arrowRight} alt="Arrow" />
                            </button>
                        </>
                        :
                        <>
                            <div className="cart__inner-empty">
                                <img src={empty} alt="Empty" />
                                <h2>Кошик порожній</h2>
                                <p>Додайте товар, для замовлення</p>
                            </div>
                        </>
                    }

                    <img className="cart__close" onClick={() => onCloseCart(false)} src={close} alt="Close" />
                </div>
            </div>
        </CSSTransition>
    )
}

export default Cart;
