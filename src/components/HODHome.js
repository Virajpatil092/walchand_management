import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const HODHome = (props) => {
    const Navigate = useNavigate();
    const [data, setdata] = useState([]);
    const url = 'http://localhost:8000/forms/getbranchwise';

  const location = useLocation();
  const branch = location.state?.branch;

    useEffect(() => {

        const token = localStorage.getItem('token');

        const verifyToken = async () => {
          try {
            const response = await axios.post('http://localhost:8000/users/login', {
              token,
            });
            console.log(response.data);
          } catch (error) {
            console.error(error);
            Navigate('/HOD');
          }
        };

        if (token) {
            Navigate('/HODHome');
        } else {
          verifyToken();
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(url,{
                    branch
                });
                setdata(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    

    const handleOnClick = () => {
        Navigate('/HODupload');
    };

    return (
        <>
        <div className="d-flex flex-column align-items-center justify-content-center h-100 position-relative">
                <button onClick={handleOnClick} type="button" className="btn btn-primary">
                    Upload New Event
                </button>
        </div>

        <div className="container">
        {data ? (
        <div className="my-5">
        <h2>API Data:</h2>
        {data.map((item) => (
            <div className='my-5' key={item.id}>
            <p>Name: {item.name}</p>
            <p>Position: {item.position}</p>
            <p>Department: {item.department}</p>
            <p>Class Name: {item.class_name}</p>
            <p>Activity Name: {item.activity_name}</p>
            <p>Mode of Attendance: {item.mode_of_attendance}</p>
            <p>Description: {item.description}</p>
            <p>Start Date: {item.start_date}</p>
            <p>End Date: {item.end_date}</p>
            <p>Location: {item.location}</p>
            <p>Category: {item.category}</p>
            <p>Participants Count: {item.participants_count}</p>
            <p>Outcomes: {item.outcomes}</p>
            <p>File: {item.file}</p>
            </div>
        ))}
        </div>
        ) : (
        <p>No data available</p>
        )}

        </div>
    </>
    );
};


export default HODHome;
