import React from 'react';
import { connect } from 'react-redux';
import { startScrapeProduct } from '../actions/products';
import ProductForm from './ProductForm';
import { v4 as uuid } from 'uuid';

class LoadProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            productURL: ''
        }
    }
    onProductURLChange = (e) => {
        const productURL = e.target.value;
        this.setState({
            productURL
        });
    }
    onLoad = () => {
        this.props.startScrapeProduct(this.state.productURL).then(() => {
            this.setState({ product: this.props.scrapedProduct })
        })
    };

    render() {

        return (
            <div>
            <input
                autoFocus
                type="text"
                placeholder="Product URL"
                onChange={this.onProductURLChange}
                value={this.state.productURL}
            />
            <button onClick={this.onLoad}>Load</button>
            <ProductForm key={uuid()} product={this.state.product} onFormSubmit={this.props.onFormSubmit}/>
        </div>
        )
    }

    

}

const mapStateToProps = (state) => ({
    scrapedProduct: state.scrapedProduct.data
});

const mapDispatchToProps = (dispatch) => ({
    startScrapeProduct: (productURL) => dispatch(startScrapeProduct(productURL))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadProduct);