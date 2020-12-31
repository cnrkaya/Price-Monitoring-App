import React from 'react';
import { Link } from 'react-router-dom'

const ProductsSummary = (props) => {
    return (
        <div>
        <input
            type="text"
            placeholder="Add Product"
        />
        <Link to='/create'>Add Product</Link>
    </div>
    );
}

export default ProductsSummary;