import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
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
        console.log(response.data);
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

        console.log(response.data);

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
      const response = await axios.get(url, {
        course,
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
                    <option value="fy">First Year</option>
                    <option value="sy">Second Year</option>
                    <option value="ty">Third Year</option>
                    <option value="Btech">Final Year</option>
                </>
                :
                (course === 'Diploma')?
                <>
                    <option value="null">Select Year</option>
                    <option value="fy">First Year</option>
                    <option value="sy">Second Year</option>
                    <option value="ty">Third Year</option>
                </>
                :
                (course === 'PG')?
                <>
                    <option value="null">Select Year</option>
                    <option value="fy">First Year</option>
                    <option value="sy">Second Year</option>
                    <option value="ty">Third Year</option>
                </>
                :
                <option value="null">Select Year</option>
                }

            </select>
        </div>

        <div className="my-5 d-flex justify-content-center">
            <button type="button" className={`btn btn-primary ${(course === "null")?'disabled':''}`} onClick={handleonclick}>Add Filter</button>
        </div>
        <div className="">
          {data ? (
            <div className='my-5'>
            <h2>API Data:</h2>
            <ul class="responsive-table">
                    <li className="table-header">
                      <div className="col col-1">Name</div>
                      <div className="col col-2">Position</div>
                      <div className="col col-3">Department</div>
                      <div className="col col-4">Class Name</div>
                      <div className="col col-5">Activity Name</div>
                      <div className="col col-6">Mode of Attendance</div>
                      <div className="col col-7">Description</div>
                      <div className="col col-8">Start Date</div>
                      <div className="col col-9">End Date</div>
                      <div className="col col-10">Location</div>
                      <div className="col col-11">Category</div>
                      <div className="col col-12">Participants Count</div>
                      <div className="col col-13">Outcomes</div>
                      <div className="col col-14">File</div>
                    </li>
              </ul>
            {data.map((item) => (
              <div className='my-5 api-item border shadow-lg h5' key={item.id}>
                  <ul className="responsive-table">
                    <li className="table-row">      
                      <div className="col col-1" >{item.name}</div>
                      <div className="col col-2" >{item.position}</div>
                      <div className="col col-3" >{item.department}</div>
                      <div className="col col-4" >{item.activity_name}</div>
                      <div className="col col-5" >{item.mode_of_attendance}</div>
                      <div className="col col-6" >{item.description}</div>
                      <div className="col col-7" >{item.department}</div>
                      <div className="col col-8" >{item.start_date}</div>
                      <div className="col col-9" >{item.end_date}</div>
                      <div className="col col-10" >{item.location}</div>
                      <div className="col col-11" >{item.category}</div>
                      <div className="col col-12" >{item.participants_count}</div>
                      <div className="col col-13" >{item.outcomes}</div>
                      <div className="col col-14" >{item.file}</div>
                    </li>
                  </ul>
              </div>
            ))}
          </div>

          ) : (
          <p>No data available</p>
          )}
        </div>
        <hr />
        </>
    )
}

export default DirectorHome;