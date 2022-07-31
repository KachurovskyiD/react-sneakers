import { useState, useContext } from 'react';
import ContentLoader from "react-content-loader"

import AppContext from '../../store/context';

import './card.scss';

import unliked from '../../assets/img/unliked.svg';
import liked from '../../assets/img/liked.svg';
import addImg from '../../assets/img/add.svg';
import addedImg from '../../assets/img/added.svg';

const Card = ({ id, title, price, imgUrl, onAddToCart, onFavourite, favourited = false, loading = false }) => {
    const { isItemAdded } = useContext(AppContext);

    const [isFavourite, setIsFavourite] = useState(favourited);

    const handleIsFavourite = () => {
        setIsFavourite(!isFavourite);
        onFavourite({ id, title, price, imgUrl, parentId: id });
    }
    const handleIsAdded = () => {
        onAddToCart({ id, title, price, imgUrl, parentId: id });
    }

    return (
        <div className="card">
            {
                loading ?
                    <ContentLoader
                        speed={2}
                        width={150}
                        height={185}
                        viewBox="0 0 150 187"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb">
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                        <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
                        <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
                        <rect x="0" y="163" rx="8" ry="8" width="80" height="24" />
                        <rect x="115" y="156" rx="8" ry="8" width="32" height="32" />
                    </ContentLoader>
                    :
                    <>
                        <img className="card__favourite" onClick={handleIsFavourite} src={isFavourite ? liked : unliked} alt="Favourite" />
                        <img className="card__img" src={imgUrl} alt="Card" />
                        <p className="card__title">{title}</p>
                        <div className="card__inner">
                            <div className="card__price">
                                <span>Ціна:</span>
                                <p>{price} грн.</p>
                            </div>
                            <img className="card__add-btn" onClick={handleIsAdded} src={isItemAdded(id) ? addedImg : addImg} alt="Add to cart" />
                        </div>
                    </>
            }
        </div>
    )
}

export default Card;