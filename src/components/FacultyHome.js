import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FacultyHome = () => {
    const Navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const url = 'http://localhost:8000/forms/getdepartmentwise';
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(url);
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
        <div className="d-flex flex-column align-items-center justify-content-center h-100 position-relative">
            <div className="position-absolute top-0 start-0 m-3" style={{ left: '20px' }}>
                <button onClick={handleOnClick} type="button" className="btn btn-primary">
                    Upload New Event
                </button>
            </div>
            {eventData && (
                <div className="mt-5">
                    <h2>Event Details</h2>
                    <p>Name: {eventData.name}</p>
                    <p>Position: {eventData.position}</p>
                    <p>Department: {eventData.department}</p>
                    <p>Class Name: {eventData.class_name}</p>
                    <p>Activity Name: {eventData.activity_name}</p>
                    <p>Mode of Attendance: {eventData.mode_of_attendance}</p>
                    <p>Description: {eventData.description}</p>
                    <p>Start Date: {eventData.start_date}</p>
                    <p>End Date: {eventData.end_date}</p>
                    <p>Location: {eventData.location}</p>
                    <p>Category: {eventData.category}</p>
                    <p>Participants Count: {eventData.participants_count}</p>
                    <p>Outcomes: {eventData.outcomes}</p>
                </div>
            )}
        </div>
    );
};

export default FacultyHome;
