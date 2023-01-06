import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUserData } from '../redux/actions';


function AddUser() {
    const [state, setState] = useState({
        name:'',
        username: '',
        email: '',
        phone: ''
    })

    const [error, setError] = useState('');

    const {name, username, email, phone} = state;
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({...state, [name]: value})
    }

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
        if(!name || !username || !email || !phone){
            setError('All field is required')
        }else{
            dispatch(addUserData(state));
            navigate('/');
            setError('')
        }
    }

  return (
    <div style={{marginLeft: '50px'}}>
        <Button onClick={() => navigate('/')} variant="contained" color="secondary">Go Back</Button>
      <h2>Add User</h2>
      {error && <h3 style={{color: 'red'}}>{error}</h3>}
          <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '45ch' },
          }}
          noValidate
          autoComplete="off"
              >
          <TextField onChange={handleInputChange} id="standard-basic" name="name" label="Full Name" value={name} variant="standard" />
          <TextField onChange={handleInputChange} id="standard-basic" name="username" label="Username" value={username} variant="standard" />
          <TextField onChange={handleInputChange} id="standard-basic" name="email" label="Email" value={email} variant="standard" />
          <TextField onChange={handleInputChange} id="standard-basic" name="phone" label="Phone" value={phone} variant="standard" />
          <br />
          <Button type="submit" variant="contained" color="success">Add User</Button>
              </Box>
             
    </div>
  )
}

export default AddUser
