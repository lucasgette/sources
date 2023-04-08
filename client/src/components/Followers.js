import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Navbar from './Navbar/Navbar';
import { addFriend, getFollowers, getFollowing, getMyProfile } from '../helpers/users';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button, IconButton, Typography } from '@mui/material';
import FlexBetween from './FlexBetween';
import { borderBottom } from '@mui/system';

const Followers = () => {

    const [data, setData] = useState(null) // UESERS LIST DATA

    const [loggedFollowing, setLoggedFollowing] = useState(null) // LIST OF USERS FOLLOWED BY LOGGED USER
    const loggedId = useSelector(state => state.id)   // LOGGED USER ID

    let { username } = useParams();  // USER WHOSE PROFILE WE ARE SEEING


    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()

    const { token } = useSelector(state => state)


    console.log(data, '----DATA----')
    console.log(loggedId, '----- Logged ID -----')
    console.log(loggedFollowing, '----- THIS SHOULD BE UPDATED -----')


    useEffect(() => {
        getFollowers(token, username)
            .then(res => { setData(res.data) })
            .catch(err => console.log(err))

        getMyProfile(token)
            .then(res => { setLoggedFollowing(res.data.following); setLoader(false) })
            .catch(error => console.error(error))
    }, [])


    const handleAddFriend = async (user) => {

        if (user._id === loggedId) return

        if (loggedFollowing.includes(user._id)) {
            if (window.confirm(`Are you sure you want to unfollow ${user.username}?`)) {

                let newList = loggedFollowing.filter(id => id != user._id)
                console.log(newList, 'NEW LIST number one!!!')
                setLoggedFollowing([...newList])

                // return addFriend(token, userData._id).then(res => setUserData(prevState => ({ ...prevState, followers: res.data.followers }))).catch(err => console.log(err))
                return addFriend(token, user._id).then(res => console.log(res)).catch(err => console.log(err))
            }
            else {
                return
            }
        }

        else {
            let newList = loggedFollowing
            newList.push(user._id)
            console.log(newList, 'NEW LIST number two!!!')
            setLoggedFollowing([...newList])

            return addFriend(token, user._id).then(res => console.log(res)).catch(err => console.log(err))
        }
    }



    return (
        <div>
            <Navbar />

            <Box sx={{
                position: 'relative',
                maxWidth: '900px',
                width: '100%',
                margin: 'auto',
            }}>

                {/* HEADER  */}

                <Box sx={{
                    zIndex: '30',
                    backgroundColor: '#fffe',
                    position: 'sticky',
                    top: '0.1px',
                    margin: 'auto',
                    minHeight: '80px',
                    padding: '20px',
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',

                }}>
                    <Typography
                        onClick={() => navigate(`/user/${username}`)}

                        sx={{
                            fontSize: '1.3rem',
                            fontWeight: 'bold',
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }}
                    >{username}</Typography>
                    <Box>
                        <FlexBetween sx={{ justifyContent: 'space-around', marginTop: '15px' }}>
                            <Typography
                                onClick={() => navigate(`/user/${username}/following`)}
                                sx={{

                                    '&:hover': {
                                        cursor: 'pointer',
                                        color: '#0087f7',
                                    }
                                }}>Following</Typography>
                            <Typography

                                sx={{
                                    color: '#0087f7',
                                    borderBottom: '2px solid #0087f7',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        color: '#0087f7',
                                    }
                                }}>Followers</Typography>
                        </FlexBetween>
                    </Box>

                </Box>

                {loader && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: '50px' }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* CONTENT WRAPPER */}
                <Box sx={{ border: '1px solid #ccc', borderTop: '0px' }}>

                    {!loader && data && data.map(user => {
                        return (
                            <Box
                                key={user.username}
                                sx={{
                                    display: 'flex',
                                    padding: '20px 15px',
                                    fontSize: '8px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                        backgroundColor: '#eeef'
                                    }
                                }}
                            >
                                <IconButton
                                    sx={{ p: 0, width: '50px', alignSelf: 'flex-start' }}>
                                    <Avatar
                                        alt={user.username.toUpperCase()}
                                        src="/static/images/avatar/2.jpg"
                                        sx={{ width: '50px', height: '50px', fontSize: '2rem', border: '4px solid white' }}
                                    />
                                </IconButton>
                                <FlexBetween>

                                    <Box sx={{ marginLeft: '25px' }}>
                                        <Box sx={{ display: 'flex' }}>

                                            <Typography
                                                onClick={() => navigate(`/user/${user.username}`)}
                                            >{user.username}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', marginTop: '15px' }}>
                                            <Typography>Max Emilian Verstappen es un piloto de automovilismo neerlandés nacido en Bélgica.​ Fue campeón del Campeonato Mundial de Karting en 2013.</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', marginTop: '15px' }}>
                                            <Typography sx={{ marginRight: '35px' }}>Followers {user.followers.length}</Typography>
                                            <Typography>Following {user.following.length}</Typography>
                                        </Box >
                                    </Box>

                                    {loggedId !== user._id &&
                                        <Button variant={loggedFollowing.includes(user._id) ? 'contained' : 'outlined'}
                                            sx={{
                                                alignSelf: 'flex-start',
                                                fontSize: '0.7rem',
                                                padding: '5px 20px',
                                                alignSelf: 'center',
                                            }}
                                            onClick={() => { handleAddFriend(user) }}>{loggedFollowing.includes(user._id) ? 'Unfollow' : 'Follow'}</Button>
                                    }
                                </FlexBetween>

                            </Box>
                        )
                    })}

                </Box>




            </Box>




        </div >

    )
}

export default Followers