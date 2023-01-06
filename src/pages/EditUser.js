import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, singleUserData, updateUserData } from '../redux/actions';


function EditUser() {
    const {user} = useSelector(state => state.users)
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
    let {id} = useParams();

    useEffect(() => {
        dispatch(singleUserData(id))
    },[dispatch, id]);


    useEffect(() => {
        if(user){
            setState({...user});
        }
    },[user]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !username || !email || !phone){
            setError('All field is required')
        }else{
            dispatch(updateUserData(state, id));
            navigate('/');
            setError('')
        }
    }

  return (
    <div style={{marginLeft: '50px'}}>
        <Button onClick={() => navigate('/')} variant="contained" color="secondary">Go Back</Button>
      <h2>Update User</h2>
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
          <TextField onChange={handleInputChange} id="standard-basic" name="name" label="Full Name" value={name || ''} variant="standard" />
          <TextField onChange={handleInputChange} id="standard-basic" name="username" label="Username" value={username || ''} variant="standard" />
          <TextField onChange={handleInputChange} id="standard-basic" name="email" label="Email" value={email || ''} variant="standard" />
          <TextField onChange={handleInputChange} id="standard-basic" name="phone" label="Phone" value={phone || ''} variant="standard" />
          <br />
          <Button type="submit" variant="contained" color="success">Update User</Button>
              </Box>
             
    </div>
  )
}

export default EditUser
