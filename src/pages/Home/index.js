import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { formatPrice } from '../../util/format'

import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';


class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    /**this here down it's for do not call func in the render */
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price)
    }))
    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    /**into the dispatch we've got put us object it is the ACTION */
    addToCartRequest(id);

  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        { products.map( product => (
          <li key={product.id}>
            <img
              src={product.image}
              alt={product.title}
            />
            <strong>{ product.title }</strong>
            <span>{ product.priceFormatted }</span>

            <button type="button" onClick={() => this.handleAddProduct(product.id)} >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                  {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        )) }

      </ProductList>
    );
  }
}

/** Puting the actions into the props in the component */
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);


const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
