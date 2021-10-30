import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const PrivateScreen = () => {
    let history = useHistory();
    const [error, setError] = useState("")

    useEffect(() => {

    }, [history])
};

export default PrivateScreen;