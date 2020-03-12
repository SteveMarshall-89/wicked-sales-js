import React from 'react';

function ProductListItem(props) {
  const price = (props.price / 100).toFixed(2);

  return (
    <div className="col-4 card-deck" >
      <div className="card border-light mb-3" onClick={() => props.click('details', { productId: props.id }) }>
        <img src={props.image} className="card-img-top mt-2" alt=""/>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">${price}</h6>
          <p className="card-text">{props.shortDesc}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
