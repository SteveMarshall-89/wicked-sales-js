import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      cart: [],
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => this.setState({ cart: this.state.cart.concat(cart) }));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(cart => this.setState({ cart: this.state.cart.concat(cart) }))
      .catch(err => this.setState({ message: err.message }));
  }

  render() {
    let productView = <ProductList view={this.setView}/>;
    if (this.state.view.name === 'details') {
      productView = <ProductDetails id={this.state.view.params} view={this.setView} addToCart={this.addToCart}/>;
    }
    return (
      <>
        <Header storeName="Wicked Sales" cartItemCount={this.state.cart.length}/>
        {productView}
      </>
    );
  }
}
