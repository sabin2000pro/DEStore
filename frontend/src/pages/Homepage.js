import '../App.css';
import {useEffect, useState} from 'react';

// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A
// File Purpose: Homepage

const Homepage = () => {
    const [pageNumber, setPageNumber] = useState(0); // The Current Page Number
    const [numberOfPages, setNumberOfPages] = useState(0); // Number of Pages Variable
    const [products, setProducts] = useState([]); // Product State
    const [displayed, setDisplay] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // The Search Term Stored here

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i); // Create an array of pages

    useEffect(() => { // useEffect hook to retrieve all the products
        return fetch(`http://localhost:5950/api/v1/products?page=${pageNumber}`).then((response) => response.json()).then(({total, products}) => {
            setProducts(products);
            setNumberOfPages(total);
        });

    }, [pageNumber]);

    return (
        <div className = "App">
            <input className = "search__input" type = "text" placeholder = "Search Product" onChange = {(event) => setSearchTerm(event.target.value)}/>
            <h3>Page {pageNumber + 1}</h3>

            {displayed ? products.filter((value) => { // Filter the products
                if(searchTerm === "") { // if there is no search term
                    return value; // Return value
                }

                else if(value.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return value;
                }

            }).map((product, key) => (
                <div className = "products" key = {key}>
                    <h4>Product Name: {product.name}</h4>
                    
                    <p>Product Description: {product.description}</p>
                    <h4>Quantity: {product.quantity}</h4>
                    <a className = "purchase__btn" href = "/">Purchase</a>

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

export default Homepage