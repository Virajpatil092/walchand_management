import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Facultyupload = () => {
    const Navigate = useNavigate();

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
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
        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('department', department);
        formData.append('class_name', className);
        formData.append('activity_name', activityName);
        formData.append('mode_of_attendance', modeOfAttendance);
        formData.append('description', description);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('participants_count', participantsCount);
        formData.append('outcomes', outcomes);
        formData.append('file', file);

        try {
            const response = await fetch('', {
                method: 'POST',
                body: formData
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
                <Form.Group>
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter position"
                        value={position}
                        className='my-3'
                        onChange={(event) => setPosition(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter department"
                        value={department}
                        className='my-3'
                        onChange={(event) => setDepartment(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter class name"
                        value={className}
                        className='my-3'
                        onChange={(event) => setClassName(event.target.value)}
                    />
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
                  <option value="">Select category</option>
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
                <Form.Label>File</Form.Label>
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

export default Facultyupload;