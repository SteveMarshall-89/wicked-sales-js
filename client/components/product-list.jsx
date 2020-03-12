import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  handleClick() {
    this.props.view('details', { productId: this.state.products.productId });
  }

  render() {
    const productGrid = this.state.products.map(product => {
      return <ProductListItem
        key={product.productId}
        name={product.name}
        price={product.price}
        image={product.image}
        shortDesc={product.shortDescription}
        click={this.props.view}
        id={product.productId}/>;
    });
    return (
      <div className="container">
        <div className="row justify-content-center">
          {productGrid}
        </div>
      </div>
    );
  }
}

export default ProductList;
