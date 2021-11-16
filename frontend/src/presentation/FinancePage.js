import React, {useState} from 'react'
import {useLocation, Link} from 'react-router-dom';

const FinancePage = () => {
    let location = useLocation();
    const {name, image, price, description} = location.state.product; // Get the location of the product data

    return (
        <div>
            <h1>Buy Now Pay Later</h1>
            <h2>Product Name: {name}</h2>
            <img height = {200} width = {200} src = {image} />
            <h2>Product Price: {price}</h2>
            <h2>Product Description: {description}</h2>

                <div>
                <Link to = {{pathname: `/`} }>Go Back</Link>
                    
                </div>
        </div>
    )
}

export default FinancePage
