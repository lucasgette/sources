import axios from "axios";


export const getMyProfile = (token) => axios.get('http://localhost:3001/user/myprofile',
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })



export const getUserProfile = (token, username) => axios.get(`http://localhost:3001/user/${username}`,
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })



export const addFriend = (token, id) => axios.patch(`http://localhost:3001/user/addfriend/${id}`, {},
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })


export const getFollowers = (token, username) => axios.get(`http://localhost:3001/user/${username}/followers`,
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })




export const getFollowing = (token, username) => axios.get(`http://localhost:3001/user/${username}/following`,
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })