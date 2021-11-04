import React, {useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';

const ProductPage = (props) => {
    let location = useLocation();
    let history = useHistory();
    const {name, image} = location.state.product;

    return (
        <div>

            <div>
                <h1>{name}</h1>
                <img height = {200} width = {200} src = {image} />
            </div>
        </div>
    )
}

export default ProductPage