import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';

const DirectorHome = (props) => {
  const Navigate = useNavigate();
  const [department, setdepartment] = useState('All');
  const [class_name, setclass_name] = useState();
  const [course, setcourse] = useState('null');
  const [data, setData] = useState([]);
  const [obj, setobj] = useState();

  useEffect(() => {

    const token = localStorage.getItem('token');

    const verifyToken = async () => {
      try {
        const response = await axios.post('http://localhost:8000/users/login', {
          token,
        });
      } catch (error) {
        console.error(error);
        Navigate('/Director');
      }
    };
    
    if (token) {
        Navigate('/DirectorHome');
    } else {
      verifyToken();
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/forms/get');
        setData(response.data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const handledepartment = (event) => {
    setdepartment(event.target.value);
  };

  const handleclass_name = (event) => {
    setclass_name(event.target.value);
  };

  const handlecourse = (event) => {
    setcourse(event.target.value);
  };

  const handleonclick = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8000/forms/getspecific';

    try {
      const response = await axios.post(url, {
        department,
        class_name,
      });
      setData(response.data);
      
    } catch (error) {
      console.error(error);
    }
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
        <div className="d-flex p-3">

            <select id="course" className="form-select mx-2" aria-label="Default select example" onChange={handlecourse}>
            <option value="null">Select Course</option>
            <option value="Degree">Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="PG">PG</option>
            </select>

            <select id="department" className="form-select mx-2" aria-label={`${(course==="null")?'Disabled':'Default'} select example`} onChange={handledepartment} disabled={course === "null"}>

            {course === 'Degree'?
                <>
                <option value="null">Select department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="Electronics">Electronics</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechinical">Mechinical</option>
                <option value="Civil">Civil</option>
                </>
                :
                (course === 'Diploma')?
                <>
                <option value="null">Select department</option>
                <option value="Electronics">Electronics</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechinical">Mechinical</option>
                <option value="Civil">Civil</option>
                </>
                :
                (course === 'PG')?
                <>
                <option value="null">Select department</option>
                <option value="Electronics">Electronics</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechinical">Mechinical</option>
                <option value="Civil">Civil</option>
                </>
                :
                <option value="null">Select department</option>
                }

            </select>

            <select id="class_name" className="form-select mx-2" aria-label={`${(course==="null")?'Disabled':'Default'} select example`} onChange={handleclass_name} disabled={course === "null"}>

            {course === 'Degree'?
                <>
                    <option value="null">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                    <option value="Final Year">Final Year</option>
                </>
                :
                (course === 'Diploma')?
                <>
                    <option value="null">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                </>
                :
                (course === 'PG')?
                <>
                    <option value="null">Select Year</option>
                    <option value="First Year">First Year</option>
                    <option value="Second Year">Second Year</option>
                    <option value="Third Year">Third Year</option>
                </>
                :
                <option value="null">Select Year</option>
                }

            </select>
        </div>

        <div className="my-5 d-flex justify-content-center">
            <button type="button" className={`btn btn-primary ${(course === "null")?'disabled':''}`} onClick={handleonclick}>Add Filter</button>
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
    )
}

export default DirectorHome;