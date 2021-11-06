// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// File Purpose: Homepage React Component - Displays information about DE-Store and allows navigation between pages

import '../App.css';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const ProductsList = () => { // Component to Render all of the products on the screen
    let DEFAULT = 0;
    const [pageNumber, setPageNumber] = useState(DEFAULT); // The Current Page Number
    const [numberOfPages, setNumberOfPages] = useState(DEFAULT); // Number of Pages Variable
    const [products, setProducts] = useState([]); // Product State
    const [displayed, setDisplay] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // The Search Term Stored here
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i); // Create an array of pages

    useEffect(() => { // useEffect hook to retrieve all the products
        const fetchProducts = () => {
            
            return fetch(`http://localhost:5950/api/v1/products?page=${pageNumber}`).then((response) => response.json()).then(({total, products}) => {
                setProducts(products);
                setNumberOfPages(total);
                return console.log(products);
            });
        }

        fetchProducts()
    }, [pageNumber]);


    return (
        <div className = "App">
        <input className = "search__input" type = "text" placeholder = "Search Product" onChange = {(event) => setSearchTerm(event.target.value)}/>
        <h3>Page {pageNumber + 1}</h3>

        {displayed ? products.filter((value) => { // Filter the products

            if(searchTerm === "") { // if there is no search term
                return value;
            }

            else if(value.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return value;
            }

        }).map((product, key) => ( // Map through the products
            
            <div className = "products" key = {key}>

                <Link to = {{pathname: `/payment/${product._id}`, state: {product}} }>Finance Now</Link>
                <h4>Product Name: {product.name}</h4>

                <p>Product Description: {product.description}</p>
                <h4>Quantity: {product.quantity}</h4>
                <h4>Price: £{product.price}</h4>
                <h4>Sale Offer: {product.saleOffer}</h4>

                <img src = {product.image} className = "product__img"></img>
             </div>
    
        )) : null}
        
     {pages.map((pageIndex) => (
             <button onClick = {() => setPageNumber(pageIndex)} >{pageIndex + 1}</button>
    ))}
        <div className = "button__group">
            <button className = "btn" onClick = {() => setDisplay(true)}>View Products</button>
            <button className = "btn" onClick = {() => setDisplay(false)}>Hide Products</button>
        </div>

    </div>
    )
    
}

export default ProductsList // Export Component