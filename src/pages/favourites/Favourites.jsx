import { useContext } from 'react';
import { Link } from "react-router-dom";

import Card from '../../components/card/Card';

import AppContext from '../../store/context';

import emptyFace from "../../assets/img/empty-face.png";

import './favourites.scss';

const Favourites = ({ onAddToCart, }) => {
    const { favourites, onAddToFavourite } = useContext(AppContext);

    return (
        <section className="favourites">
            <div className="container">
                <div className="favourites__wrapper">
                    {favourites.length > 0 ?
                        <>
                            <div className="favourites__header">
                                <h1 className="favourites__title title">Улюблене:</h1>
                            </div>
                            <div className="favourites__inner">
                                {favourites.map((card) => (
                                    <Card
                                        {...card}
                                        key={card.id}
                                        onAddToCart={(obj) => onAddToCart(obj)}
                                        onFavourite={(obj) => onAddToFavourite(obj)}
                                        favourited={true}
                                    />
                                ))}
                            </div>
                        </>
                        :
                        <div className="favourites__inner-empty">
                            <img src={emptyFace} alt="Empty" />
                            <h2>Закладок немає</h2>
                            <p>Ви нічого не додали...</p>
                            <Link to="/react-sneakers" className="button">Повернутися на головну</Link >
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Favourites;
