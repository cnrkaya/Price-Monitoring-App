import React from 'react';
import { connect } from 'react-redux';
import RecommendedProductListItem from './RecommendedProductListItem';

export const RecommendedProductList = (props) => (
    <div>
        <div>
        {
            props.recommendedProducts.length === 0 ? (
                <div>
                    <span>No recommended products</span>
                </div>
            ) : (
                props.recommendedProducts.map((recommendedProduct) => {
                    return <RecommendedProductListItem key={recommendedProduct.id} {...recommendedProduct} />
                })
            )
        }
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    recommendedProducts: state.recommendedProducts
})

export default connect(mapStateToProps)(RecommendedProductList);