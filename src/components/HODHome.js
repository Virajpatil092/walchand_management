import React from 'react';
import { useNavigate } from 'react-router-dom';

const HODHome = () => {
	const Navigate = useNavigate();

    const handleonclick = () =>{

		Navigate('/HODupload');
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100 position-relative">
            
            <div className="position-absolute top-0 start-0 m-3" style={{ left: '20px' }}>
            <button onClick={handleonclick} type="button" class="btn btn-primary">Upload New Event</button>
            </div>
        </div>
    );
}

export default HODHome;
