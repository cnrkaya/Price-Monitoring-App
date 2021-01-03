import React from 'react';
import moment from 'moment';
import axios from 'axios';
import LoadingPage from './LoadingPage';

export default class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hostname: '',
            productURL: '',
            imageURL: '/images/placeholder.png',
            productName: '',
            currentPrice: '',
            targetPrice: '',
            note: '',
            createdAt: moment(),
            isLoading: false,
            error: '',
            recommendedProduct: null
        }
    }
    onProductURLChange = (e) => {
        const productURL = e.target.value;
        this.setState(() => ({
            productURL
        }));
    }
    onProductNameChange = (e) => {
        const productName = e.target.value;
        this.setState(() => ({
            productName
        }));
    }
    onCurrentPriceChange = (e) => {
        const currentPrice = e.target.value;
        if (!currentPrice || currentPrice.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({
                currentPrice
            }));
        }
    }
    onTargetPriceChange = (e) => {
        const targetPrice = e.target.value;
        if (!targetPrice || targetPrice.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({
                targetPrice
            }));
        }
    }
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({
            note
        }));
    }
    scrape = () => {
        axios.post('/scrape', { url: this.state.productURL })
        .then((response) => {
            this.setState({ ...response.data })
            this.recommendProduct()
        })
        .catch((error) => this.setState(() => ({ error: 'An error has occurred during the product scraping!' })))
        .finally(() => this.setState(() => ({ isLoading: false })));
    }
    recommendProduct = () => {
        axios.post('/most-similar-product', {productName: this.state.productName })
        .then((response) => this.setState({ recommendedProduct: response.data }))
        .catch((error) => this.setState(() => ({ error: 'An error has occurred during the product recommendation!' })))
        .finally(() => this.setState(() => ({ isLoading: false })));
    }
    onLoad = (e) => { 
        this.setState(() => ({
            isLoading: true,
            error: ''
        }));  

        this.scrape();        
    }
    onSubmit = (e) => {
        e.preventDefault();
        const isNotValidForm = !this.state.productURL || !this.state.productName || !this.state.currentPrice || !this.state.targetPrice;
        if (isNotValidForm) {
            this.setState(() => ({
                error: 'Please provide all necessary fields!'
            }));
        } else {
            this.setState(() => ({
                error: ''
            }));
            const recommendedProduct = this.state.recommendedProduct;
            recommendedProduct.currentPrice = parseFloat(recommendedProduct.currentPrice, 10) * 100;
            this.props.onFormSubmit({
                hostname: this.state.hostname,
                productURL: this.state.productURL,
                imageURL: this.state.imageURL,
                productName: this.state.productName,
                currentPrice: parseFloat(this.state.currentPrice, 10) * 100,
                targetPrice: parseFloat(this.state.targetPrice, 10) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            }, recommendedProduct);
        }
    }
    render() {
        return (
            <div>
                {this.state.isLoading ? <LoadingPage /> : null}
    
                <div>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Product URL"
                        onChange={this.onProductURLChange}
                        value={this.state.productURL}
                    />
                    <button onClick={this.onLoad}>Load</button>
                </div>
                <form onSubmit={this.onSubmit}>
                {this.state.error && <p>{this.state.error}</p>}
                <div>
                    <img 
                        src={this.state.imageURL}
                        height={250}
                        width={250}
                    />
                    <div>
                        <input 
                            type="text"
                            placeholder="Product Name"
                            onChange={this.onProductNameChange}
                            value={this.state.productName}
                        />
                        <input 
                            type="text"
                            placeholder="Current Price"
                            onChange={this.onCurrentPriceChange}
                            value={this.state.currentPrice}
                        />
                        <input 
                            type="text"
                            placeholder="Target Price"
                            onChange={this.onTargetPriceChange}
                            value={this.state.targetPrice}
                        /> 
                        <textarea 
                            placeholder="Add a note for your product (optional)"
                            onChange={this.onNoteChange}
                            value={this.state.note}
                        /> 
                        <div>
                            <button>Save Product</button>
                        </div>                      
                    </div>
                
                </div>
            </form>
            
            </div>

        )
    }
}