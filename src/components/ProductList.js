import React from 'react';
import { connect } from 'react-redux';
import ProductListItem from './ProductListItem';
import selectProducts from '../selectors/products';

export const ProductList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div style={{marginLeft: "6.2rem"}}>Image</div>
            <div style={{marginLeft: "7.9rem"}}>Product Name</div>
            <div style={{marginLeft: "23rem"}}>Date</div>
            <div style={{marginLeft: "6rem"}}>Current Price</div>
            <div style={{marginLeft: "3rem"}}>Target Price</div>
            <div style={{marginLeft: "5rem"}}>Link</div>
        </div>
        <div className="list-body">
        {
            props.products.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No products</span>
                </div>
            ) : (
                props.products.map((product) => {
                    return <ProductListItem key={product.createdAt} {...product} />
                })
            )
        }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        products: selectProducts(state.products, state.filters)
    };
}

export default connect(mapStateToProps)(ProductList);