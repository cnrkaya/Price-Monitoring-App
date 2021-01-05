import React from 'react';
import { Link } from 'react-router-dom'

const ProductsSummary = (props) => {
    return (
        <div className="page-header">
            <div className="content-container">
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Product</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductsSummary;