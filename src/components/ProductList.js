import React from 'react';
import { connect } from 'react-redux';
import ProductListItem from './ProductListItem';

export const ProductList = (props) => (
    <div>
        <div>
        {
            props.products.length === 0 ? (
                <div>
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
        products: state.products
    };
}

export default connect(mapStateToProps)(ProductList);