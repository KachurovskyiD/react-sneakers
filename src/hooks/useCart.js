import {
    useContext
} from 'react';
import AppContext from '../store/context';

export const useCart = () => {
    const {
        cartItems
    } = useContext(AppContext);
    const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);

    return {
        totalPrice
    };
}