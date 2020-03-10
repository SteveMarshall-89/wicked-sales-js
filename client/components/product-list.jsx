import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  render() {
    const productGrid = this.state.products.map(product => {
      return <ProductListItem
        key={product.productId}
        name={product.name}
        price={product.price}
        image={product.image}
        shortDesc={product.shortDescription}/>;
    });
    return (
      { productGrid }
    );
  }
}

export default ProductList;
