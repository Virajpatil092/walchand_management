import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const FacultyHome = () => {
    const Navigate = useNavigate();
    const [eventData, setEventData] = useState([]);
    const url = 'http://localhost:8000/forms/getdepartmentwise';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url,{
                    
                });
                setEventData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleOnClick = () => {
        Navigate('/Facultyupload');
    };

    return (
        <>
        <div className="d-flex flex-column align-items-center justify-content-center h-100 position-relative">
            <div className="position-absolute top-0 start-0 m-3" style={{ left: '20px' }}>
                <button onClick={handleOnClick} type="button" className="btn btn-primary">
                    Upload New Event
                </button>
            </div>
        </div>
        <div className="container">
          {eventData ? (
            <div className="my-5">
            <h2>API Data:</h2>
            {eventData.map((item) => (
              <div key={item.id}>
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


export default FacultyHome;
