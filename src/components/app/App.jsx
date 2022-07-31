import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from '../header/Header';
import Cart from '../cart/Cart';
import Slider from '../slider/Slider';
import Content from '../../pages/content/Content';
import Favourites from '../../pages/favourites/Favourites';

import AppContext from '../../store/context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favouritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62d03ee71cc14f8c08876112.mockapi.io/cart'),
          axios.get('https://62d03ee71cc14f8c08876112.mockapi.io/favourites'),
          axios.get('https://62d03ee71cc14f8c08876112.mockapi.io/items'),
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Помилка при запиті даних ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (newItem) => {
    try {
      const findItem = cartItems.find(item => item.parentId === newItem.id);
      if (findItem) {
        setCartItems(cartItems => cartItems.filter(item => item.parentId !== newItem.id));
        axios.delete(`https://62d03ee71cc14f8c08876112.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(cartItems => [...cartItems, newItem]);
        const { data } = await axios.post('https://62d03ee71cc14f8c08876112.mockapi.io/cart', newItem);
        setCartItems(cartItems => cartItems.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    }
    catch (err) {
      alert(err.message);
    }
  }

  const onRemoveFromCart = (id) => {
    axios.delete(`https://62d03ee71cc14f8c08876112.mockapi.io/cart/${id}`);
    setCartItems(cartItems => cartItems.filter(item => item.id !== id));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const onAddToFavourite = async (newItem) => {
    try {
      if (favourites.find(favObj => favObj.id === newItem.id)) {
        axios.delete(`https://62d03ee71cc14f8c08876112.mockapi.io/favourites/${newItem.id}`);
        setFavourites(favourite => favourite.filter(item => item.id !== newItem.id));
      } else {
        const { data } = await axios.post('https://62d03ee71cc14f8c08876112.mockapi.io/favourites', newItem);
        setFavourites(favourite => [...favourite, data]);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const isItemAdded = (id) => {
    return cartItems.some(item => item.parentId === id);
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favourites, isItemAdded, onAddToFavourite }}>
      <Router>
        <div className="wrapper">
          <Cart
            items={cartItems}
            show={cartOpened}
            onCloseCart={setCartOpened}
            onRemoveFromCart={onRemoveFromCart} />
          <Header onClickCart={setCartOpened} />
          <main className="main">
            <Routes>
              <Route
                path="react-sneakers"
                element={
                  <>
                    <Slider />
                    <Content
                      arrData={items}
                      cartItems={cartItems}
                      onAddToCart={onAddToCart}
                      onAddToFavourite={onAddToFavourite}
                      onChangeSearchInput={onChangeSearchInput}
                      searchValue={searchValue}
                      isLoading={isLoading} /></>
                } />
              <Route
                path="favourites"
                element={
                  <Favourites
                    onAddToCart={onAddToCart}
                  />
                } />
            </Routes>
          </main>
        </div>
      </Router>
    </AppContext.Provider>

  );
}

export default App;
