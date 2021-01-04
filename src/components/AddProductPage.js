import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { startAddProduct } from '../actions/products';
import { startAddRecommendedProduct } from '../actions/recommendedProducts';

export class AddProductPage extends React.Component {
    onSubmit = (scrapedProduct, recommendedProduct) => {
        this.props.startAddProduct(scrapedProduct);
        this.props.startAddRecommendedProduct(recommendedProduct);
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <h1>Add Product</h1>
                <ProductForm onFormSubmit={this.onSubmit}/>
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