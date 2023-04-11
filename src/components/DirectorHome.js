import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const DirectorHome = (props) => {
  const Navigate = useNavigate();
  const [department, setdepartment] = useState('All');
  const [class_name, setclass_name] = useState();
  const [course, setcourse] = useState('null');
  const [data, setData] = useState([]);

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
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name ? item.name : 'N/A'}</td>
                    <td>{item.position ? item.position : 'N/A'}</td>
                    <td>{item.department ? item.department : 'N/A'}</td>
                    <td>{item.class_name ? item.class_name : 'N/A'}</td>
                    <td>{item.activity_name ? item.activity_name : 'N/A'}</td>
                    <td>{item.mode_of_attendance ? item.mode_of_attendance : 'N/A'}</td>
                    <td>{item.description ? item.description : 'N/A'}</td>
                    <td>{item.start_date ? new Date(item.start_date).toLocaleDateString() : "N/A"}</td>
                    <td>{item.end_date ? new Date(item.end_date).toLocaleDateString() : "N/A"}</td>
                    <td>{item.location ? item.location : 'N/A'}</td>
                    <td>{item.category ? item.category : 'N/A'}</td>
                    <td>{item.participants_count ? item.participants_count : 'N/A'}</td>
                    <td>{item.outcomes ? item.outcomes : 'N/A'}</td>
                    <td>{item.file ? item.file : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <br />
        <br />
        </>
    )
}

export default DirectorHome;