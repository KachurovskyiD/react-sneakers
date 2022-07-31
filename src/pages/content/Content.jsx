import Card from '../../components/card/Card';

import './content.scss';

import search from '../../assets/img/search.svg';

const Content = ({ arrData, onAddToCart, onAddToFavourite, onChangeSearchInput, searchValue, isLoading }) => {
    const renderItems = () => {
        const filteredItems = arrData.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));

        return (isLoading ? [...Array(8)] : filteredItems).map((card, index) => (
            <Card
                {...card}
                key={card ? card.id : index}
                onAddToCart={(obj) => onAddToCart(obj)}
                onFavourite={(obj) => onAddToFavourite(obj)}
                loading={isLoading}
            />
        ))
    }

    return (
        <section className="content">
            <div className="container">
                <div className="content__wrapper">
                    <div className="content__header">
                        <h1 className="content__title title">{searchValue ? `Пошук за запитом: ${searchValue}` : "Усі кросівки"}</h1>
                        <div className="content__search">
                            <img className="content__search-icon" src={search} alt="Search" />
                            <input className="content__search-input" type="text" onChange={onChangeSearchInput} value={searchValue} placeholder="Пошук..." />
                        </div>
                    </div>
                    <div className="content__inner">
                        {renderItems()}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Content;
