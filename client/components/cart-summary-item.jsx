import React from 'react';

function CartSummaryItem(props) {
  const price = (props.price / 100).toFixed(2);

  return (
    <div className="container" >
      <div className="card border-light mb-3">
        <div className="row no-gutters flex-nowrap">
          <div className="col-md-4">
            <img src={props.image} className="card-img-top m-2" alt="" />
          </div>
          <div className="card-body">
            <h3 className="card-title">{props.name}</h3>
            <h4 className="card-subtitle mb-2 text-muted">${price}</h4>
            <p className="card-text">{props.shortDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
