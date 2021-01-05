import React from 'react';
import { connect } from 'react-redux';
import RecommendedProductListItem from './RecommendedProductListItem';

export const RecommendedProductList = (props) => (
    <div className="content-container">
        <div className="list-header list-header--recommended">
            <div>Recommended Products</div>
        </div>
        
        {
            props.recommendedProducts.length === 0 ? (
                <div className="list-body"> 
                    <div className="list-item list-item--message">
                        <span>No recommended products</span>
                    </div>
                </div>
            ) : (
                <div className="list-body list-body--recommended"> 
                    {props.recommendedProducts.map((recommendedProduct) => {
                        return <RecommendedProductListItem key={recommendedProduct.id} {...recommendedProduct} />
                    })}
                </div>
            )
        }
       
    </div>
);

const mapStateToProps = (state) => ({
    recommendedProducts: state.recommendedProducts
})

export default connect(mapStateToProps)(RecommendedProductList);