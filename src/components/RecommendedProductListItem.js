import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const RecommendedProductListItem = ({ hostname, productName, currentPrice, imageURL, productURL }) => (
    <div className="list-item list-item--recommended">
        <img className="list-item__image" style={{marginBottom: "4rem"}} src={imageURL}/>
        <div className="list-item__body list-item__body--recommened">
            <div>
                <h3 className="list-item__title list-item__title--recommended">{productName}</h3>
                <h5 className="list-item__sub-title" style={{marginBottom: "2rem"}}>{hostname}</h5>
            </div>
            <h3 className="list-item__data list-item__data--recommended" style={{marginBottom: "1rem", padding: 0}}>{numeral(currentPrice/100).format('0,0.00').concat(' TL')}</h3>
            <Link className="button list-item__button list-item__data--recommended" to={{pathname: productURL}} target='_blank'>Visit</Link>
        </div>
    </div>
)

export default RecommendedProductListItem;