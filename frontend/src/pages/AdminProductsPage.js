import '../App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

const AdminProductsPage = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);

    return (
        <div> 
            <h1>Store Manager All Products - Portal</h1>
        </div>
    )
};

export default AdminProductsPage; // Export Admin products page