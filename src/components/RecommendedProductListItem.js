import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

const RecommendedProductListItem = ({ hostname, productName, currentPrice, imageURL, productURL }) => (
    <div>
        <img src={imageURL} height={150} width={150}/>
        <div>
            <div>
                <h3>{productName}</h3>
                <h5>{hostname}</h5>
            </div>
            <h3>{numeral(currentPrice/100).format('0,0.00').concat(' TL')}</h3>
            <Link to={{pathname: productURL}} target='_blank'>Visit</Link>
        </div>
    </div>
)

export default RecommendedProductListItem;