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
                const response = await axios.post(url,{
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

        <div className="my-5">
          {data ? (
            <div className='my-5'>
            {data.map((item) => (
              <div id='directorview' className='my-5 api-item border shadow-lg h5 table-responsive container' key={item.id}>

              <table className="table table-bordered">
              <thead className='thead-dark'>
                <tr>
                      <th className="col col-1">Name</th>
                      <th className="col col-2">Position</th>
                      <th className="col col-3">Department</th>
                      <th className="col col-4">Class Name</th>
                      <th className="col col-5">Activity Name</th>
                      <th className="col col-6">Mode of Attendance</th>
                      <th className="col col-7">Description</th>
                      <th className="col col-8">Start Date</th>
                      <th className="col col-9">End Date</th>
                      <th className="col col-10">Location</th>
                      <th className="col col-11">Category</th>
                      <th className="col col-12">Participants Count</th>
                      <th className="col col-13">Outcomes</th>
                      <th className="col col-14">File</th>
                </tr>
              </thead>
                <tbody>
                  <tr>
                      <th className="col col-1" >{item.name ? item.name : 'N/A'}</th>
                      <th className="col col-2" >{item.position ? item.position : 'N/A'}</th>
                      <th className="col col-3" >{item.department ? item.department : 'N/A'}</th>
                      <th className="col col-4" >{item.class_name ? item.class_name : 'N/A'}</th>
                      <th className="col col-5" >{item.activity_name ? item.activity_name : 'N/A'}</th>
                      <th className="col col-6" >{item.mode_of_attendance ? item.mode_of_attendance : 'N/A'}</th>
                      <th className="col col-7" >{item.description ? item.description : 'N/A'}</th>
                      <th className="col col-8">{item.start_date ? new Date(item.start_date).toLocaleDateString() : "N/A"}</th>
                      <th className="col col-8">{item.end_date ? new Date(item.end_date).toLocaleDateString() : "N/A"}</th>
                      <th className="col col-10" >{item.location ? item.location : 'N/A'}</th>
                      <th className="col col-11" >{item.category ? item.category : 'N/A'}</th>
                      <th className="col col-12" >{item.participants_count ? item.participants_count : 'N/A'}</th>
                      <th className="col col-13" >{item.outcomes ? item.outcomes : 'N/A'}</th>
                      <th className="col col-14" >{item.file ? item.file : 'N/A'}</th>
                  </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          ) : (
          <p>No data available</p>
          )}
        </div>

        <hr />
    </>
    );
};


export default HODHome;
