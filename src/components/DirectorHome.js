import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DirectorHome = (props) => {
  const [branch, setbranch] = useState('All');
  const [year, setyear] = useState();
  const [course, setcourse] = useState('null');
  const [data, setData] = useState(null);

  useEffect(() => {
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

  const handlebranch = (event) => {
    setbranch(event.target.value);
  };

  const handleyear = (event) => {
    setyear(event.target.value);
  };

  const handlecourse = (event) => {
    setcourse(event.target.value);
  };

  const handleonclick = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8000/forms/getspecific';

    try {
      const response = await axios.post(url, {
        course,
        branch,
        year,
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
            </select>

            <select id="branch" className="form-select mx-2" aria-label={`${(course==="null")?'Disabled':'Default'} select example`} onChange={handlebranch} disabled={course === "null"}>

            {course === 'Degree'?
                <>
                <option value="null">Select Branch</option>
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
                <option value="null">Select Branch</option>
                <option value="Electronics">Electronics</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechinical">Mechinical</option>
                <option value="Civil">Civil</option>
                </>
                :
                <option value="null">Select Branch</option>
                }

            </select>

            <select id="year" className="form-select mx-2" aria-label={`${(course==="null")?'Disabled':'Default'} select example`} onChange={handleyear} disabled={course === "null"}>

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
            {data ? 
                <div className='my-5'>
                <h2>API Data:</h2>
                <p>Name: {data.name}</p>
                <p>Position: {data.position}</p>
                <p>Department: {data.department}</p>
                <p>Class Name: {data.class_name}</p>
                <p>Activity Name: {data.activity_name}</p>
                <p>Mode of Attendance: {data.mode_of_attendance}</p>
                <p>Description: {data.description}</p>
                <p>Start Date: {data.start_date}</p>
                <p>End Date: {data.end_date}</p>
                <p>Location: {data.location}</p>
                <p>Category: {data.category}</p>
                <p>Participants Count: {data.participants_count}</p>
                <p>Outcomes: {data.outcomes}</p>
                <p>File: {data.file}</p>
                </div>
                :
                <p>No data available</p>
            }
            </div>
        </>
    )
}

export default DirectorHome;