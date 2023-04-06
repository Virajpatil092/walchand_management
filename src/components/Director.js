import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

const Director = (props) => {

	const Navigate = useNavigate();

	const [alert, setAlert] = useState(null);
	const [username, setusername] = useState('');
	// const [email, setemail] = useState('');
	const [pass, setpass] = useState('');	
	const [branch, setbranch] = useState('Director');

	//To keep track of email	
	// const handleemail = (event) =>{
	// 	setemail(event.target.value);
	// }

	const handleusername = (event) =>{
		setusername(event.target.value);
	}

	//to keep track of pass
	const handlepass = (event) =>{
		setpass(event.target.value);
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

	const handleOnClick = async (e) => {
		e.preventDefault();
	  
		const url = 'http://localhost:8000/users/login';

        try {

          const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password: pass, branch})
        });
            const data = await response.json();

            console.log(response);
        
            const token = data.token;
		  if (token) {
			// Store JWT token in local storage
			localStorage.setItem('token', token);
	  
			// Redirect user to home page
			Navigate('/DirectorHome');
		  } else {
			showAlert("Username and Password doesn't match", "danger");
		  }
		} catch (error) {
		  showAlert("An error occurred while logging in", "danger");
		  console.log(error);
		}
	  };

    return (
	    <div id="main-container" className="container d-grid h-100 my-5">
	      <Form id="sign-in-form" className="text-center p-3 w-100 shadow-lg p-4 mb-4 bg-white">

		<h6 className="text-left my-4 opacity-75">Director Login</h6>

		<Form.Group className="my-3" controlId="sign-in-email-address">
			<div className="text-left opacity-75">
				Username*
			</div>
		  <Form.Control type="email" onChange={handleusername} size="md" placeholder="Username" autoComplete="username" className="position-relative" />
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


		<Alert alert={alert}/>

		<div className="mb-4 d-grid">
			<button type="button" onClick={handleOnClick} className={`btn btn-primary ${(username === '' || pass === '')?'disabled':''}`} >Sign-in</button>
		</div>
	      </Form>
	    </div>
    )
}


export default Director;