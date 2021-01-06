import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

class ProductsSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            infoMessage: '',
            showLoader: false
        };
    }
    onCheckPrice = () => {
        this.setState({
            isLoading: true,
            showLoader: true,
            infoMessage: 'Product prices are being checked...'
        });
    }
    onCrawl = () => {
        this.setState({
            isLoading: true,
            showLoader: true,
            infoMessage: 'Crawling is being done...'
        });
        axios.get('/discounted-products', {})
        .then((response) => {
            this.setState({ infoMessage: 'Crawling has been completed! ✔', showLoader: false });
            setTimeout(() => {
                 this.setState({ isLoading: false, imageUrl: '' })
            }, 3000);
        })
        .catch((error) => this.setState(() => ({ infoMessage: 'An error has occurred during crawling!', showLoader: false })));
    }
    render(){
        return (
            <div className="page-header">
                <div className="content-container">
                    <div className="page-header__actions" style={{display: "flex", justifyContent: "space-between"}}>
                        <Link className="button" to="/create">Add Product</Link>
                        {
                            this.state.isLoading && (
                                <div style={{display: "flex"}}>
                                    {this.state.showLoader && (<img src={"/images/loader2.gif"} style={{width: "3rem", height: "3rem", marginRight: "1rem"}} />)} 
                                    <p className="form__error">
                                        {this.state.infoMessage}
                                    </p>
                                        
                                </div>)
                        
                        }
                        <div>
                            <button className="button button--secondary" style={{marginRight: "1rem"}}>Check Prices</button>
                            <button className="button button--secondary" onClick={this.onCrawl}>Start Crawler</button>
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
}


export default ProductsSummary;