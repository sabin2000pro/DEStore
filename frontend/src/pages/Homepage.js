import '../App.css';
import {useEffect, useState} from 'react';

// Code Author: Sabin Constantin Lungu
// Code Written on: 25/10/2021
// Last Modified Date: 25/10/2021 @ 21:54
// Bugs? N/A

const Homepage = () => {
    const [pageNumber, setPageNumber] = useState(0); // The Current Page Number
    const [numberOfPages, setNumberOfPages] = useState(0); // Number of Pages Variable
    const [products, setProducts] = useState([]); // Product State
    const [displayed, setDisplay] = useState(false);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i); // Create an array of pages

    useEffect(() => {

        return fetch(`http://localhost:5950/api/v1/products?page=${pageNumber}`).then((response) => response.json()).then(({total, products}) => {
            console.log(total, products);
            setProducts(products);
            setNumberOfPages(total);
        });

    }, [pageNumber]);

    return (
        <div className = "App">
            <h3>Page {pageNumber + 1}</h3>

            {displayed ? products.map((product, key) => (
                <div className = "products" key = {key}>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>

                 </div>
        
            ))
        : null}

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