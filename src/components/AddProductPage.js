import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { addProduct } from '../actions/products';
import { addRecommendedProduct } from '../actions/recommendedProducts';

export class AddProductPage extends React.Component {
    onSubmit = (scrapedProduct, recommendedProduct) => {
        this.props.dispatch(addProduct(scrapedProduct));
        this.props.dispatch(addRecommendedProduct(recommendedProduct));
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

export default connect()(AddProductPage);