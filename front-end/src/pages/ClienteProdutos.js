import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/NavBar';
import DeliveryAppContext from '../context/DeliveryAppContext';

function ClienteProdutos() {
  const history = useHistory();

  // const [addItem, setAddItem] = useState([]);
  // const [removeItem, setRemoveItem] = useState([]);
  const [username, setUsername] = useState('');
  const { fetchProducts, setFetchProducts } = useContext(DeliveryAppContext);
  const endpoint = 'http://localhost:3001/products';

  const getAPIs = async () => { // requisição à API com o endpoint como parâmetro, pois será decidido apenas após aperta o botão de busca
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
  };

  const getLocalStorage = () => {
    const userData = localStorage.getItem('user');
    const userDataObj = JSON.parse(userData);
    setUsername(userDataObj.name);
  };

  const storageProducts = async () => {
    if (!JSON.parse(localStorage.getItem('customerProducts'))) {
      // const productsQty = (await getAPIs()).forEach((e) => [...e]);
      localStorage.setItem('customerProducts', JSON.stringify(await getAPIs()));
    }
  };

  const addItem = ({ target }) => {
    const { name } = target;
    console.log(name);
  };

  useEffect(async () => {
    setFetchProducts(await getAPIs());
    getLocalStorage();
    storageProducts();
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div>
      <Navbar
        username={ username }
        logout={ logout }
      />
      { (
        fetchProducts.map((products) => (
          <div
            key={ products.id }
          >
            <p data-testid={ `customer_products__element-card-price-${products.id}` }>
              { products.price.replace(/\./, ',') }

            </p>
            <img
              data-testid={ `customer_products__img-card-bg-image-${products.id}` }
              src={ products.urlImage }
              alt={ `É a foto de ${products.name}` }
            />
            <p data-testid={ `customer_products__element-card-title-${products.id}` }>
              { products.name }

            </p>
            <button
              type="button"
              data-testid={ `customer_products__button-card-rm-item-${products.id}` }
            >
              -
            </button>
            <input
              value={ 0 }
              type="number"
              data-testid={ `customer_products__input-card-quantity-${products.id}` }
            />
            <button
              name={ products.name }
              onClick={ (e) => addItem(e) }
              type="button"
              data-testid={ `customer_products__button-card-add-item-${products.id}` }
            >
              +
            </button>
          </div>
        ))) }
      <div>
        <button
          type="button"
          data-tesstid="customer_products__button-cart"
        >
          <span data-testid="customer_products___checkout-botton-value">preço</span>
        </button>
      </div>
    </div>
  );
}

export default ClienteProdutos;
