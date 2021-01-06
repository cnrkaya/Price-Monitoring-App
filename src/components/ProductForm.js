import React from 'react';
import moment from 'moment';
import axios from 'axios';

export default class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hostname: props.product ? props.product.hostname : '',
            imageURL: props.product ? props.product.imageURL : '/images/placeholder.png',
            productName: props.product ? props.product.productName : '',
            currentPrice: props.product ? (props.product.currentPrice / 100).toString() : '',
            targetPrice: props.product ? (isNaN(props.product.targetPrice) ? '' : (props.product.targetPrice / 100).toString()) : '',
            note: props.product ? props.product.note : '',
            createdAt: props.product ? (moment(props.product.createdAt)) : moment(),
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
                <div>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Product URL"
                        onChange={this.onProductURLChange}
                        value={this.state.productURL}
                        className="text-input form-input-element form-load-url"
                    />
                    <button 
                        onClick={this.onLoad}
                        className="button button--secondary form-load-button"
                    >Load</button>
                 </div>


                <form onSubmit={this.onSubmit} className="form">
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <div className="form-content">
                        <img 
                            src={this.state.isLoading ? "./images/loader.gif" : this.state.imageURL}
                            className="form-image"
                        />
                        <div >
                            <div className="form-input-group ">
                                    <input 
                                    type="text"
                                    placeholder="Product Name"
                                    onChange={this.onProductNameChange}
                                    value={this.state.productName}
                                    className="text-input form-input-element"
                                    />
                                    <input 
                                        type="text"
                                        placeholder="Current Price"
                                        onChange={this.onCurrentPriceChange}
                                        value={this.state.currentPrice}
                                        className="text-input form-input-element"
                                    />
                                    <input 
                                        type="text"
                                        placeholder="Target Price"
                                        onChange={this.onTargetPriceChange}
                                        value={this.state.targetPrice}
                                        className="text-input form-input-element"
                                    /> 
                                    <textarea 
                                        placeholder="Add a note for your product (optional)"
                                        onChange={this.onNoteChange}
                                        value={this.state.note}
                                        className="textarea form-input-element"
                                     /> 
                            
                            </div>

                            <div>
                                
                            </div>                      
                        </div>
                    </div>
                    <button className="button form-button">Save Product</button> 
                </form>
            </div>
        )
    }
}
