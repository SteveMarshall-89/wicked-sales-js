import React from 'react';

function ProductListItem(props) {
  const cardWidth = {
    width: '32%',
    margin: '1rem'
  };

  return (
    <div className="container">
      <div className="card" style={cardWidth}>
        <img src={props.image} className="card-img-top" alt=""/>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.price}</p>
          <a href="" className="btn btn-primary">GO</a>
        </div>
      </div>
    </div>

  );
}

export default ProductListItem;
