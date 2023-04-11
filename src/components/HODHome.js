import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Table } from 'react-bootstrap';


const HODHome = (props) => {
    const Navigate = useNavigate();
    const [data, setdata] = useState([]);
    const url = 'http://localhost:8000/forms/getbranchwise';
    const [obj, setobj] = useState();

    useEffect(() => {
        const department = localStorage.getItem('branch');
        const token = localStorage.getItem('token');

        const verifyToken = async () => {
          try {
            const response = await axios.post('http://localhost:8000/users/login', {
              token,
            });
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
            const response = await axios.post(url, { department });
            console.log(department);
            setdata(response.data);
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
        {obj && 
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <Table striped bordered hover responsive>
              <thead className='thead-dark'>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Class Name</th>
                  <th>Activity Name</th>
                  <th>Mode of Attendance</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Participants Count</th>
                  <th>Outcomes</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {
                  <>
                    <td>{obj.name ? obj.name : 'N/A'}</td>
                    <td>{obj.position ? obj.position : 'N/A'}</td>
                    <td>{obj.department ? obj.department : 'N/A'}</td>
                    <td>{obj.class_name ? obj.class_name : 'N/A'}</td>
                    <td>{obj.activity_name ? obj.activity_name : 'N/A'}</td>
                    <td>{obj.mode_of_attendance ? obj.mode_of_attendance : 'N/A'}</td>
                    <td>{obj.description ? obj.description : 'N/A'}</td>
                    <td>{obj.start_date ? new Date(obj.start_date).toLocaleDateString() : "N/A"}</td>
                    <td>{obj.end_date ? new Date(obj.end_date).toLocaleDateString() : "N/A"}</td>
                    <td>{obj.location ? obj.location : 'N/A'}</td>
                    <td>{obj.category ? obj.category : 'N/A'}</td>
                    <td>{obj.participants_count ? obj.participants_count : 'N/A'}</td>
                    <td>{obj.outcomes ? obj.outcomes : 'N/A'}</td>
                    <td>{obj.file ? obj.file : 'N/A'}</td>
                    </>
                }
              </tbody>
            </Table>
              </div>
            </div>
          </div>
        </div>
        }
        <div className="d-flex flex-column align-items-center justify-content-center h-100 position-relative">
                <button onClick={handleOnClick} type="button" className="btn btn-primary">
                    Upload New Event
                </button>
        </div>

        <div className="my-5">
      {data ? (
        <>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {data.slice(0).reverse().map((item) => (
              <div key={item.id} className="col">
                <Card className='shadow p-3 mb-5 bg-white rounded'>
                  <Card.Header>{item.name ? item.name : 'N/A'}</Card.Header>
                  <Card.Body>
                    <Card.Title>{item.activity_name ? item.activity_name : 'N/A'}</Card.Title>
                    <Card.Text>{item.description ? item.description : 'N/A'}</Card.Text>
                    <button type="button" className="btn btn-primary" onClick={()=>{setobj(item)}} data-toggle="modal" data-target="#exampleModalCenter">View Details</button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          
          </>
          ):
          (
            <></>
          )}
        </div>

        <br />
        <br />
    </>
    );
};


export default HODHome;
