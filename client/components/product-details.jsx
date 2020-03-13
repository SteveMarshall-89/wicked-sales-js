import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      buttonText: 'Add To Cart'
    };
    this.addToCartButton = this.addToCartButton.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.id.productId}`)
      .then(res => res.json())
      .then(product => this.setState({ product }));
  }

  addToCartButton() {
    clearTimeout(this.timeout);
    this.props.addToCart(this.state.product);
    this.setState({ buttonText: 'Added' });
    this.timeout = setTimeout(() => this.setState({ buttonText: 'Add To Cart' }), 1500);
  }

  render() {

    let btnClass = 'btn btn-primary';
    if (this.state.buttonText === 'Added') {
      btnClass = 'btn btn-success';
    }
    if (this.state.product) {
      const price = (this.state.product.price / 100).toFixed(2);
      return (
        <div className="container">
          <div className="card border-light mb-3">
            <div className="card-header p-4">
              <a onClick={() => this.props.view('catalog', {})}><i className="fas fa-chevron-left"></i> Back To Catalog</a>
            </div>
            <div className="row flex-nowrap">
              <div className="col-md-4 m-3">
                <img src={this.state.product.image} className="card-img-top" alt="" />
              </div>
              <div className="card-body m-4">
                <h2 className="card-title">{this.state.product.name}</h2>
                <h5 className="card-subtitle mb-2 text-muted">${price}</h5>
                <p className="card-text">{this.state.product.shortDescription}</p>
                <button className={btnClass} onClick={() => this.addToCartButton()}>{this.state.buttonText}</button>
              </div>
            </div>
            <p className="card-body card-text m-3">{this.state.product.longDescription}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
