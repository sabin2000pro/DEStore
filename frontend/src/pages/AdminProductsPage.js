import '../App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const AdminProductsPage = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0); // Number of Pages Variable
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [displayed, setDisplayed] = useState(false);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => { // Fetch all products
        return fetch(`http://localhost:5950/api/v1/products?page=${pageNumber}`).then((response) => response.json()).then(({total, products}) => {
            setProducts(products);
            setNumberOfPages(total);
            console.log(products);
            
        });
    }, [pageNumber]);

    return (
        <div className = "App"> 
        <input className = "search__input" placeholder = "Search Product" type = "text" onChange = {(event) => {setSearchTerm(event.target.value)}} />
         <h1>Store Manager All Products - Portal</h1>

            <h3>Page {pageNumber + 1}</h3>

        </div>
    )
};

export default AdminProductsPage; // Export Admin products page