import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { startAddProduct } from '../actions/products';
import { startAddRecommendedProduct } from '../actions/recommendedProducts';

class AddProductPage extends React.Component {
    onSubmit = (scrapedProduct, recommendedProduct) => {
        this.props.startAddProduct(scrapedProduct);
        this.props.startAddRecommendedProduct(recommendedProduct);
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Product</h1>
                    </div>  
                </div>
                <div className="content-container">
                    <ProductForm onFormSubmit={this.onSubmit}/>
                </div>
            </div>
            
            
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddProduct: (product) => dispatch(startAddProduct(product)),
        startAddRecommendedProduct: (recommendedProduct) => dispatch(startAddRecommendedProduct(recommendedProduct))
    };
};

export default connect(undefined, mapDispatchToProps)(AddProductPage);