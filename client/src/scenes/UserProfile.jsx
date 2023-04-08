import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { color, display } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Post from '../components/Post/Post'
import { getUserPosts } from '../helpers/post'
import { addFriend, getUserProfile } from '../helpers/users.js'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


const UserProfile = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState(null)
    const [error, setError] = useState(null)
    const [posts, setPosts] = useState([])


    const { token } = useSelector(state => state)
    const loggedId = useSelector(state => state.id)
    const loggedUsername = useSelector(state => state.user)

    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')



    let { username } = useParams();

    useEffect(() => {
        if (username === loggedUsername) return navigate('/my-profile')

        getUserPosts(token, username)
            .then(res => setPosts(res.post))
            .catch(error => setError(error.response.data.error))
        getUser()
    }, [])


    const getUser = () => {
        getUserProfile(token, username)
            .then(res => setUserData(res.data))
            .catch(error => setError({ error: error.message, msg: `User ${username} does not exist.` }))
    }

    const handleAddFriend = async () => {
        if (userData._id === loggedId) return

        if (userData.followers.includes(loggedId)) {
            if (window.confirm(`Are you sure you want to unfollow ${username}?`)) {
                let newList = userData.followers.filter(id => id !== loggedId)
                setUserData(prevState => ({ ...prevState, followers: newList }))

                // return addFriend(token, userData._id).then(res => setUserData(prevState => ({ ...prevState, followers: res.data.followers }))).catch(err => console.log(err))
                return addFriend(token, userData._id).then(res => console.log(res)).catch(err => console.log(err))
            }
            else { return }
        }
        let newList = userData.followers
        newList.push(loggedId)
        setUserData(prevState => ({ ...prevState, followers: newList }))
        addFriend(token, userData._id).then(res => console.log(res)).catch(err => console.log(err))
    }

    return (
        <>
            <Navbar />
            {userData && (
                <Box sx={{
                    position: 'relative',
                    maxWidth: '900px',
                    width: '100%',
                    margin: 'auto',
                }}>

                    {/* HEADER  */}

                    <Box sx={{
                        backgroundColor: '#ddd',
                        margin: 'auto',
                        height: '20vh',
                        maxHeight: '300px',
                        minHeight: '120px',
                        position: 'relative'
                    }} />

                    {/* CONTENT WRAPPER */}

                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0 30px', borderBottom: '1px solid #ddd' }}>

                        {/* TOP SECTION */}

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                position: 'relative',
                                height: '120px'
                            }}>

                            {/* PROFILE PIC & NAME */}
                            <Box height='100%'>
                                <Box sx={{ position: 'absolute', top: '-60px' }} >
                                    <IconButton
                                        sx={{ p: 0, width: '120px' }}>
                                        <Avatar
                                            alt={userData.username.toUpperCase()}
                                            src="/static/images/avatar/2.jpg"
                                            sx={{ p: 0, width: '120px', height: '120px', fontSize: '2rem', border: '4px solid white' }}

                                        />
                                    </IconButton>
                                    <Typography sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                        {userData.username}
                                    </Typography>
                                </Box>
                            </Box>


                            {userData && userData.followers.includes(loggedId)
                                ? <Button variant="contained" sx={{ borderRadius: '15px', alignSelf: 'flex-start', margin: '20px 40px' }} onClick={handleAddFriend}>Unfollow</Button>
                                : <Button variant="outlined" sx={{ borderRadius: '15px', alignSelf: 'flex-start', margin: '20px 40px' }} onClick={handleAddFriend}>Follow</Button>
                            }
                        </Box>

                        {/* INFORMATION */}

                        <Typography sx={{ width: '95%', textAlign: 'justify', minWidth: '300px', maxWidth: '500' }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, enim at fugiat fugit commodi ad qui nesciunt eum corrupti expedita? Praesentium fugit officiis eaque consequatur deserunt, libero explicabo repudiandae a?
                        </Typography>

                        <Box sx={{ color: '#666', margin: '25px 0', display: 'flex', gridGap: '50px' }}>
                            <Typography
                                onClick={() => navigate(`/user/${username}/followers`)}
                                sx={{ fontWeight: 'bold', fontSize: '0.9rem', '&:hover': { color: '#0887f7', cursor: 'pointer' } }}
                            >
                                {userData.followers.length} Followers
                            </Typography>
                            <Typography
                                onClick={() => navigate(`/user/${username}/following`)}
                                sx={{ fontWeight: 'bold', fontSize: '0.9rem', '&:hover': { color: '#0887f7', cursor: 'pointer' } }}

                            >
                                {userData.following.length} Following
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        {!posts.length ? (
                            <Typography>
                                There are no posts
                            </Typography>
                        )
                            : (
                                posts.sort((a, b) => b.date - a.date).map(post => (
                                    <Post
                                        key={post._id}
                                        id={post._id}
                                        content={post.content}
                                        user={post.author}
                                        timeAgo={timeAgo.format(post.date)}
                                        setPosts={setPosts}
                                    />
                                ))
                            )
                        }
                    </Box>

                </Box>
            )}


            {error && (
                <Box>
                    <Typography>
                        {error.msg}
                    </Typography>
                </Box>
            )}
            {/* <Link to='/'>Home page</Link> */}
        </>
    )
}

export default UserProfile;