import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.setName = this.setName.bind(this);
    this.setCreditCard = this.setCreditCard.bind(this);
    this.setShippingAddress = this.setShippingAddress.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  setName(event) {
    this.setState({ name: event.target.value });
  }

  setCreditCard(event) {
    const newArray = event.target.value.match(/\d{1,4}/g);
    const creditCard = newArray.join(' ');
    this.setState({ creditCard });
  }

  setShippingAddress(event) {
    this.setState({ shippingAddress: event.target.value });
  }

  submitForm(event) {
    event.preventDefault();
    const regex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    if (!regex.test(this.state.creditCard) || !this.state.name || !this.state.creditCard || !this.state.shippingAddress) {
      return;
    }
    this.props.placeOrder(this.state);
  }

  render() {
    const cartList = Object.values(this.props.cartItems);
    const subtotal = cartList.reduce(function (acc, cur) {
      return acc + cur.price;
    }, 0);
    const subtotalF = parseFloat((subtotal / 100).toFixed(2));
    const tax = parseFloat((subtotalF * 0.08).toFixed(2));
    const total = (tax + subtotalF);

    return (
      <form className="container" onSubmit={this.submitForm}>
        <h1 className="mb-3">My Cart</h1>
        <div className="d-flex flex-column mb-3 form-group">
          <label htmlFor="name">Name<span className="text-danger font-weight-bold">*</span></label>
          <input type="text" id="name" placeholder="Name" value={this.state.name} onChange={this.setName} />
        </div>
        <div className="d-flex flex-column mb-3 form-group">
          <label htmlFor="credit">Credit Card<span className="text-danger font-weight-bold">*</span></label>
          <input type="text" id="credit" placeholder="Credit Card Number" value={this.state.creditCard} onChange={this.setCreditCard} minLength="16" maxLength="19"/>
        </div>
        <div className="d-flex flex-column form-group">
          <label htmlFor="shipping">Shipping Address<span className="text-danger font-weight-bold">*</span></label>
          <textarea id="shipping" rows="5" value={this.state.shippingAddress} onChange={this.setShippingAddress} />
        </div>
        <h6 className="text-danger font-weight-bold font-italic">*Required Fields</h6>
        <div className="d-flex justify-content-between mt-5">
          <a onClick={() => this.props.view('catalog', {})}><i className="fas fa-chevron-left"></i> Back To Catalog</a>
          <div className="text-right">
            <h5 className="mr-3 text-muted">Subtotal: ${subtotalF}</h5>
            <h5 className="mr-3 text-muted">Tax: ${tax}</h5>
            <h5 className="mr-3 text-muted">Shipping: FREE</h5>
            <h2 className="mr-3">Total: ${total}</h2>
            <button className="btn btn-info btn-lg mt-3" type="submit">Place Order</button>
          </div>
        </div>
      </form>
    );
  }
}
