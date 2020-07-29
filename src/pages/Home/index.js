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

  handleAddProduct = product => {
    /**All componnet connect with redux receive a prop named dispatch */
    const { addToCart } = this.props;

    /**into the dispatch we've got put us object it is the ACTION */
    addToCart(product);

  };

  render() {
    const { products } = this.state;

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

            <button type="button" onClick={() => this.handleAddProduct(product)} >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" /> 3
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

export default connect(null, mapDispatchToProps)(Home);
