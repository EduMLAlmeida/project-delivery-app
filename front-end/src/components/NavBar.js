import React from 'react';
import '../App.css';

function Navbar({ username }) {
  return (
    <nav className="navbar-teste">
      <div data-testid="customer_products__element-navbar-link-products">Produtos</div>
      <div data-testid="customer_products__element-navbar-link-orders">Meus Pedidos</div>
      <p data-testid="customer_products__element-navbar-user-full-name">{ username }</p>
      <button 
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Navbar;
