import '../App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const AdminProductsPage = () => {
    let history = useHistory();
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0); // Number of Pages Variable
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [displayed, setDisplay] = useState(false);

    const [productName, setNewProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productDescription, setProductDescription] = useState(""); // The New Product Description
    const [productPrice, setProductPrice] = useState(0);
    const [productPriceDiscount, setPriceDiscount] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0); // The Product Quantity
    const [productSaleOffer, setProductSaleOffer] = useState("");
    const [productColour, setProductColour] = useState("");
    const [newProduct, setNewProductData] = useState([]);
    const [newQty, setNewQty] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [email, setEmailAddress] = useState("");

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => { // Fetch all products
        return fetch(`http://localhost:5950/api/v1/products?page=${pageNumber}`).then((response) => response.json()).then(({total, products}) => {
            setProducts(products);
            setNumberOfPages(total);            
        });

    }, [pageNumber]);

    const createProduct = () => { // Function that creates a new product to be stored
        try {
            axios.post(`http://localhost:5950/api/v1/products`, {name: productName, image: productImage, description: productDescription, price: productPrice, priceDiscount: productPriceDiscount, quantity: productQuantity, saleOffer: productSaleOffer, colour: productColour}).then(data => {
                const newProductData = data.data;
                setNewProductData(newProductData);
                console.log(newProductData);
            })

            alert('Product Created');
            return window.location.reload(false);
        } 
        
        catch(error) {
            if(error) {
                console.log(error);
            }
        }
    };

    const updatePrice = (id) => { // Update the price of a product
        try {
            axios.put(`http://localhost:5950/api/v1/products/${id}`, {id: id, newPrice: newPrice}).then(data => {console.log(data)}).catch(err => {console.log(err)});
            alert('Price Updated');
            return window.location.reload(false);
        } 
        
        catch(error) {
            if(error) {
                console.log(error);
            }
        }
    };

    const deleteProduct = (id) => { // Deletes a product from the inventory
        try {
            axios.delete(`http://localhost:5950/api/v1/products/${id}`, {id:id});
            alert('Product Deleted');
            return window.location.reload(false);
        } 
        
        catch(error) {
            if(error) {
                return console.log(error);
            }
        }
    };

    const checkQuantity = (id) => { // Checks the quantity of the product
        return axios.get(`http://localhost:5950/api/v1/products/${id}`).then((response) => {
            const {quantity} = response.data;
            axios.post(`http://localhost:5950/api/v1/products/verifyStock/${id}`, {id, email: email});
            alert('Low Stock - E-mail Sent');
            return window.location.reload(false);
        })
    };

    return (
        <div className = "App"> 

        <input className = "search__input" placeholder = "Search Product" type = "text" onChange = {(event) => {setSearchTerm(event.target.value)}} />
         <h1>DE-Store - Inventory Control</h1>
         <h2>Create Electronic Product </h2>

        <div>
            <label for = "name">Product Name: </label>
            <input type = "text" placeholder = "Enter Product Name" required id = "name" onChange = {(e) => {setNewProductName(e.target.value)}} />
         </div>

         <div>
            <label for = "image">Product Image URL </label>
             <input type = "text" placeholder = "Enter Image URL" required id = "image" onChange = {(e) => {setProductImage(e.target.value)}} />
        </div>

        <div>
            <label for = "description">Product Description </label>
            <input type = "text" placeholder = "Enter Product Description" required id = "description" onChange = {(e) => {setProductDescription(e.target.value)}} />
        </div>

        <div>
            <label for = "price">Product Price </label>
            <input type = "number" placeholder = "Enter Product Price" required id = "price" onChange = {(e) => {setProductPrice(e.target.value)}} />
        </div>

        <div>
            <label for = "priceDiscount">Price Discount </label>
            <input type = "number" placeholder = "Enter Price Discount" required id = "priceDiscount" onChange = {(e) => {setPriceDiscount(e.target.value)}} />
        </div>

        <div>
            <label for = "priceDiscount">Quantity</label>
            <input type = "number" placeholder = "Enter Qty To Add" required id = "quantity" onChange = {(e) => {setProductQuantity(e.target.value)}} />
        </div>

        <div>
            <label for = "saleOffer">Sale Offer</label>
            <input type = "text" placeholder = "Enter Type of Sale Offer" required id = "saleOffer" onChange = {(e) => {setProductSaleOffer(e.target.value)}} />
        </div>

        <div>
            <label for = "saleOffer">Colour</label>
            <input type = "text" placeholder = "Enter Colour" required id = "colour" onChange = {(e) => {setProductColour(e.target.value)}} />
        </div>

        <button onClick = {createProduct} type = "submit">Create New Product </button>

         <h3>Page {pageNumber + 1}</h3>

         {displayed ? products.filter((value) => { // Filter out value for searching

             if(searchTerm === "") {
                 return value;
             }

             else if(value.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                 return value;
             }

         }).map((product, key) => (
             
            <div className = "products" key = {key}>

            <div>
                <h1>Price Control</h1>
                <label for = "editPrice">Edit Price:  </label>
                <input type = "number" placeholder = "Enter New Price" onChange = {(e) => setNewPrice(e.target.value)} />
                <button onClick = {() => updatePrice(product._id)} type = "submit">Edit Price</button>
            </div>
            
            <div>
                <button onClick = {() => deleteProduct(product._id)} type = "submit">Delete Product</button>
            </div>

            <div>
                <label for = "email">E-mail Address </label>
                <input type = "text" placeholder = "Enter E-mail Address" onChange = {(e) => {setEmailAddress(e.target.value)}} />
                <button onClick = {() => checkQuantity(product._id)}>Check Quantity</button>
            </div>

            <h4>Product Name: {product.name}</h4>
            <p>Product ID: {product._id} </p>
            <p>Product Description: {product.description}</p>
            <h4>Price: £{product.price}</h4>
            <h4>Sale Offer: {product.saleOffer}</h4>
            <h5>In Stock</h5>
            <img src = {product.image} className = "product__img"></img>
            
         </div>

         )) : null}

{pages.map((pageIndex) => (
             <button onClick = {() => setPageNumber(pageIndex)} >{pageIndex + 1}</button>
    ))}
        <div className = "button__group">
            <button className = "btn" onClick = {() => setDisplay(true)}>Upload Products</button>
            <button className = "btn" onClick = {() => setDisplay(false)}>Hide Products</button>
        </div>

    </div>

    )
};

export default AdminProductsPage; // Export Admin products page