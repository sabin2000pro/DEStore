import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {saveAs} from 'file-saver';
import axios from 'axios';

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
            axios.post('/create-pdf').then(() => axios.get('fetch-pdf', { responseType: 'blob' })).then((res) => {

            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

              saveAs(pdfBlob, 'newPdf.pdf');
            })
        
            }

    return (
        <div>
            <h1>Performance Analysis</h1>

            <div>
                <h2>Generate Report Below</h2>
                <button onClick = {generatePerformanceReport}>Generate Performance Report</button>
            </div>


        </div>
    )
}

export default PerformancePage