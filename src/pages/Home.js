import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { deleteUserData, loadUserData } from '../redux/actions';
import { useNavigate } from 'react-router-dom'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Home() {
    const { users } = useSelector((state) => state.users);
    // console.log(users, 'users')
    const dispatch = useDispatch();
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(loadUserData())
    }, [dispatch])

    const handleDelete = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUserData(id))
        }
    }



    return (
        <div style={{marginLeft: '50px', marginRight: '50px'}}>
            <Button style={{marginBottom: '20px'}} onClick={() => navigate('/add-user')} variant="contained">Add User</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Username</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.phone}</StyledTableCell>
                                <StyledTableCell align="center">{user.username}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button onClick={() => navigate(`/update-user/${user.id}`)} sx={{fontSize:12, marginRight:1 }} variant="outlined">Edit</Button>
                                    <Button onClick={() => handleDelete(user.id)} sx={{fontSize:12, }} variant="contained" color="secondary">Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home