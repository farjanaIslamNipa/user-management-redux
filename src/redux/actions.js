import axios from "axios";
import { ADD_USER, DELETE_USER, GET_SINGLE_USER, GET_USERS, UPDATE_USER } from "./actionTypes";


export const getUsers = (data) => {
    return {
        type: GET_USERS,
        payload: data
    }
};

export const loadUserData = () => {
    return async (dispatch, getState) => {
        await axios.get(`${process.env.REACT_APP_API}`)
        .then(res => {
            dispatch(getUsers(res.data));
        })
        .catch(error => console.log(error));
    }
}

export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
}

export const deleteUserData = (id) => {
    return async (dispatch) => {
        await axios.delete(`${process.env.REACT_APP_API}/${id}`)
        .then(res => {
            dispatch(deleteUser())
            dispatch(loadUserData())
        })
        .catch(error => console.log(error))
    }
}

export const addUser = () => {
    return {
        type: ADD_USER,
        // payload: 
    }
}

export const addUserData = (user) => {
    return async (dispatch) => {
        await axios.post(`${process.env.REACT_APP_API}`, user)
        .then(res => {
            dispatch(addUser())
        })
    }
}

export const getSingleUser = (user) => {
    return {
        type: GET_SINGLE_USER,
        payload: user
    }
}

export const singleUserData = (id) => {
    return async (dispatch) => {
        await axios.get(`${process.env.REACT_APP_API}/${id}`)
        .then(res => {
            dispatch(getSingleUser(res.data))
        })
        .catch(error => console.log(error))
    }
}

export const updateUser = () => {
    return {
        type: UPDATE_USER
    }
}

export const updateUserData = (user, id) => {
    return async (dispatch) => {
        axios.put(`${process.env.REACT_APP_API}/${id}`, user)
        .then(res => {
            dispatch(updateUser())
        })
        .catch(error => console.log(error))
    }
}
