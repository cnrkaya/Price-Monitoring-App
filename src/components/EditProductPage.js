import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { startEditProduct } from '../actions/products';


class EditProductPage extends React.Component {
    onSubmit = (product) => {
        this.props.startEditProduct(this.props.product.id, product);
        this.props.history.push('/');
    }
    onRemove = () => {
        this.props.startRemoveProduct({ id: this.props.product.id });
        this.props.history.push('/');
    }
    render(){
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Product</h1>
                    </div>
                </div>

                <div className="content-container">
                    <ProductForm
                        product={this.props.product}
                        onFormSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" >Remove Product</button>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state, props) => ({
    product: state.products.find((product) => product.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditProduct: (id, product) => dispatch(startEditProduct(id, product)),
    startRemoveProduct: (data) => dispatch(dispatch(startEditProduct(data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage);