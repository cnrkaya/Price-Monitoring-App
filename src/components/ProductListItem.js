import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import numeral from 'numeral';


const ProductListItem = ({ id, hostname, productURL, imageURL, productName, createdAt, currentPrice, targetPrice }) => (
    <div className="list-item" >
        <Link className="list-item" style={{border: "none", padding:0}} >
            <img className="list-item__image" style={{marginRight: "3rem"}} src={imageURL}/>
            <div className="list-item__body">
                <div className="list-item__header">
                    <h3 className="list-item__title">{productName}</h3>
                    <h5 className="list-item__sub-title">{hostname}</h5>
                </div>
                <div className="list-item__info">
                    <span className="list-item__sub-title list-item__data" >{moment({createdAt}).format('MMMM Do, YYYY')}</span>
                    <h3 className="list-item__data">{numeral(currentPrice/100).format('0,0.00').concat(' TL')}</h3>
                    <h3 className="list-item__data">{numeral(targetPrice/100).format('0,0.00').concat(' TL')}</h3>
                    
                </div>
            </div>
        </Link>
        <Link className="button list-item__button" style={{marginBottom: "2rem"}} to={{pathname: productURL}} target='_blank'>Visit</Link>
    </div>
);

export default ProductListItem;