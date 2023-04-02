import React from 'react';
import { Link } from 'react-router-dom';

const Main = (props) => {
    return (
        <>
        <div className="d-flex align-items-center justify-content-center my-5">
            <div className="mx-2">
            <Link to="/Director">
                <button type="button" className="btn btn-primary">Director</button>            
            </Link>
            </div>

            <div className="mx-2">
            <Link to="/HOD">
                <button type="button" className="btn btn-warning">HOD </button>            
            </Link>
            </div>
            <div className="mx-2">
            <Link to="/Faculty">
                <button type="button" className="btn btn-danger">Faculty</button>
            </Link>
            </div>
        </div>
        </>
    )
}

export default Main;