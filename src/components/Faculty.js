import React from 'react';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Faculty = (props) => {
	const Navigate = useNavigate();

	const [alert, setAlert] = useState(null);
	const [email, setemail] = useState('');
	const [pass, setpass] = useState('');
	const [branch,setbranch] = useState('');

	// To keep track of email
	const handleemail = (event) =>{
		setemail(event.target.value);
	}

	//to keep track of pass
	const handlepass = (event) =>{
		setpass(event.target.value);
	}

	const handlebranch = (event) =>{
		setbranch(event.target.value);
	}

	const showAlert = (message,type)=>{
		//to set type of alert and message of alert
	  setAlert({
		msg:message,
		type:type
	  });

	  //show for only 1 second

	  setTimeout(() => {
		setAlert(null);
	  }, 1000);
	}

	const handleonclick = async (e) =>{
		e.preventDefault();
	
		try {
			const response = await fetch('http://localhost:8000/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password: pass, branch})
			});
			const data = await response.json();

		Navigate('/FacultyHome')
		} catch (error) {
			showAlert("Username and Password dosen't match","danger");
		}
	}

    return (
	    <div id="main-container" className="container d-grid h-100 my-5">
	      <Form id="sign-in-form" className="text-center p-3 w-100 shadow-lg p-4 mb-4 bg-white">

		<h6 className="text-left my-4 opacity-75">Faculty Login</h6>

		<Form.Group className="my-3" controlId="sign-in-email-address">
			<div className="text-left opacity-75">
				Username*
			</div>
		  <Form.Control type="email" onChange={handleemail} size="md" placeholder="Username" autoComplete="username" className="position-relative" />
		</Form.Group>
		<br />

		<Form.Group className="mb-4" controlId="sign-in-password">
		<div className="text-left opacity-75">
				Password*
			</div>
		  <Form.Control type="password" size="md" placeholder="Password"
		  onChange={handlepass}
		  autoComplete="current-password"
		  className="position-relative" />
		</Form.Group>
		<br />

        <Form.Group className="mb-4" controlId="sign-in-password">
		<div className="text-left opacity-75">
			Department*
		</div>
		<select className="form-select" aria-label="Default select example" onChange={handlebranch}>
			<option value="Select">Select-Department</option>
			<option value="CSE">CSE</option>
			<option value="IT">IT</option>
			<option value="Electronics">Electronics</option>
			<option value="Electrical">Electrical</option>
			<option value="Mechinical">Mechinical</option>
			<option value="Civil">Civil</option>
		</select>
		</Form.Group>
		<br />
		
		<Alert alert={alert}/>

		<div className="mb-4 d-grid">
			<button type="button" onClick={handleonclick} className={`btn btn-primary ${(email === '' || pass === '' || branch === "Select" || branch ==="")?'disabled':''}`} >Sign-in</button>
		</div>
	      </Form>
	    </div>
    )
}

export default Faculty;