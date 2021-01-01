import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { addProduct } from '../actions/products';

export class AddProductPage extends React.Component {
    onSubmit = (product) => {
        this.props.dispatch(addProduct(product));
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