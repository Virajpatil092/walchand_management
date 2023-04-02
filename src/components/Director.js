import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Director = (props) => {

	const Navigate = useNavigate();

	const [email, setemail] = useState('');
	const [pass, setpass] = useState('');	

	//To keep track of email
	const handleemail = (event) =>{
		setemail(event.target.value);
	}

	//to keep track of pass
	const handlepass = (event) =>{
		setpass(event.target.value);
	}

	const handleonclick = async (e) =>{
		e.preventDefault();
	
		try {
			const response = await fetch('/api/Dirlogin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password: pass })
			});
			const data = await response.json();
			console.log(data);

			Navigate('/DirectorHome')

		} catch (error) {
			console.error(error);
		}
	}


    return (
	    <div id="main-container" className="container d-grid h-100 my-5">
	      <Form id="sign-in-form" className="text-center p-3 w-100 shadow-lg p-4 mb-4 bg-white" onClick={handleonclick}>

		<h6 className="text-left my-4 opacity-75">Director Login</h6>

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

		<div className="mb-4 d-grid">
			<button type="button" className={`btn btn-primary ${(email === '' || pass === '')?'disabled':''}`} >Sign-in</button>
		</div>
	      </Form>
	    </div>
    )
}


export default Director;