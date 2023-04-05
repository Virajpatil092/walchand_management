import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DirectorHome = (props) => {
  const [department, setdepartment] = useState('All');
  const [class_name, setclass_name] = useState();
  const [course, setcourse] = useState('null');
  const [data, setData] = useState([]);

  useEffect(() => {
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
      console.log(response.data);
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
                <option value="null">Select Year</option>
                }

            </select>
        </div>

        <div className="my-5 d-flex justify-content-center">
            <button type="button" className={`btn btn-primary ${(course === "null")?'disabled':''}`} onClick={handleonclick}>Add Filter</button>
        </div>
        <div className="container">
          {data ? (
            <div className="my-5">
            <h2>API Data:</h2>
            {data.map((item) => (
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
    )
}

export default DirectorHome;