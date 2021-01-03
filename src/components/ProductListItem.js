import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import numeral from 'numeral';


const ProductListItem = ({ hostname, productURL, imageURL, productName, createdAt, currentPrice, targetPrice }) => (
    <div>
        <img src={imageURL} height={150} width={150}/>
        <div>
            <div>
                <h3>{productName}</h3>
                <h5>{hostname}</h5>
            </div>
            <span>{moment({createdAt}).format('MMMM Do, YYYY')}</span>
            <h3>{numeral(currentPrice/100).format('0,0.00').concat(' TL')}</h3>
            <h3>{numeral(targetPrice/100).format('0,0.00').concat(' TL')}</h3>
            <Link to={{pathname: productURL}} target='_blank'>Visit</Link>
        </div>
    </div>
);

export default ProductListItem;