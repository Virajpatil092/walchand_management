import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HODupload = (props) => {
    const Navigate = useNavigate();

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState();
    const [className, setClassName] = useState('');
    const [activityName, setActivityName] = useState('');
    const [modeOfAttendance, setModeOfAttendance] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [participantsCount, setParticipantsCount] = useState('');
    const [outcomes, setOutcomes] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();
      let formData = {
          'name': name,
          'position': position,
          'department': department,
          'class_name': className,
          'activity_name': activityName,
          'mode_of_attendance': modeOfAttendance,
          'description': description,
          'start_date': startDate,
          'end_date': endDate,
          'location': location,
          'category': category,
          'participants_count': participantsCount,
          'outcomes': outcomes,
          'file': file
      };

      console.log(formData);

      const url = 'http://localhost:8000/forms/create';

      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
          const data = await response.json();
          console.log(data);
  
          Navigate('/HODHome');
      } catch (error) {
          console.error(error);
      }
  };
  
  
    return (
        <div id="main-container" className="container d-grid h-100 my-5 my-3">
            <Form id='form' className="text p-3 w-100 shadow-lg p-4 mb-4 bg-white my-3" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        className='my-3'
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className='my-4'>
                    <Form.Label>Position*</Form.Label>
                    <select className="form-select" aria-label="Default select example"  onChange={(event) => setPosition(event.target.value)}>
                        <option value='null'>Select Position</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="non_teaching_staff">Non Teaching Staff</option>
                    </select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="sign-in-password">
                    <div className="text-left opacity-75">
                        Department*
                    </div>
                    <select className="form-select" 
                    aria-label="Default select example" 
                    onChange={(event) => setDepartment(event.target.value)}>
                        <option value='null'>Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Mechinical">Mechinical</option>
                        <option value="Civil">Civil</option>
                    </select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="sign-in-password">
                    <div className="text-left opacity-75">
                        Class (for student)*
                    </div>
                    <select className="form-select" 
                    aria-label="Default select example" 
                    onChange={(event) => setClassName(event.target.value)}>
                        <option value='null'>Select class</option>
                        <option value="First Year">First Year</option>
                        <option value="Second Year">Second Year</option>
                        <option value="Third Year">Third Year</option>
                        <option value="Final Year">Final Year</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Activity"
                        value={activityName}
                        className='my-3'
                        onChange={(event) => setActivityName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mode of Attendance</Form.Label>
                  <Form.Control
                    as='select'
                    value={modeOfAttendance}
                    className='my-3'
                    onChange={(event) => setModeOfAttendance(event.target.value)}
                  >
                    <option value=''>Select an option</option>
                    <option value='in-person'>In-person</option>
                    <option value='online'>Online</option>
                    <option value='hybrid'>Hybrid</option>
                    <option value='not-applicable'>Not Applicable</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter description'
                    value={description}
                    className='my-3'
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='Enter start date'
                    value={startDate}
                    className='my-3'
                    onChange={(event) => setStartDate(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" className="my-3" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter location" value={location} className="my-3" onChange={(event) => setLocation(event.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" className="my-3" value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="null">Select category</option>
                  <option value="academics">Academics</option>
                  <option value="community service">Community Service</option>
                  <option value="sports">Sports</option>
                  <option value="research">Research</option>
                  <option value="guest lecture">Guest Lecture</option>
                  <option value="professional department">Professional Department</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Participants Count</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter number of participants"
                  value={participantsCount}
                  className='my-3'
                  onChange={(event) => setParticipantsCount(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Outcomes</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter outcomes"
                  value={outcomes}
                  className='my-3'
                  onChange={(event) => setOutcomes(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>File (limit 1)</Form.Label>
                <Form.Control
                  type="file"
                  className='my-3'
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </Form.Group>
                <Button className='my-3' type="submit">Submit</Button>
            </Form>
          </div>
  );
};

export default HODupload;