import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const PerformancePage = () => { // Performance Analysis Page Component
    let history = useHistory();

    useEffect(() => {
        return fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            
        } 
        
        catch(error) {
            if(error) {
                throw new Error(error);
            }
        }
    }

    const generatePerformanceReport = () => {
        try {

        } 
        
        catch(error) {

        }
    }

    return (
        <div>
            <h1>Performance Analysis</h1>

            <div>
                <h2>Generate Report Below</h2>
                <button>Generate Performance Report</button>
            </div>


        </div>
    )
}

export default PerformancePage