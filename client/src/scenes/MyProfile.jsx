import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { deletePost, getPosts } from '../helpers/post'
import { getFollowers, getMyProfile } from '../helpers/users'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Post from '../components/Post/Post'
import PostForm from '../components/Form/PostForm'


const MyProfile = () => {

    const { token } = useSelector(state => state)
    const navigate = useNavigate()



    const [data, setData] = useState(null)
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const loggedId = useSelector(state => state.id)
    const loggedUser = useSelector(state => state.user)
    console.log(posts)

    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')



    useEffect(() => {
        getMyProfile(token)
            .then(res => setData(res.data))
            .catch(error => setError(error.response.data.error))

        getPosts(token)
            .then(res => setPosts(res.post))
            .catch(error => setError(error.response.data.error))

    }, [token])


    const postsSetter = (id) => {

        setPosts(prevPosts => prevPosts.filter(post => post._id !== id))


    }


    return (
        <>
            <Navbar />
            {data && (
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
                                            alt={data.username.toUpperCase()}
                                            src={`http://localhost:3001/${data.avatar}`}
                                            sx={{ p: 0, width: '120px', height: '120px', fontSize: '2rem', border: '4px solid white' }}

                                        />



                                    </IconButton>
                                    <Typography sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
                                        {data.username}
                                    </Typography>
                                </Box>
                            </Box>


                            <Button variant="contained"
                                sx={{ borderRadius: '15px', alignSelf: 'flex-start', margin: '20px 40px' }}
                                onClick={() => console.log('Edit profile function pending')}
                            >Edit Profile</Button>

                        </Box>

                        {/* INFORMATION */}

                        <Typography sx={{ width: '95%', textAlign: 'justify', minWidth: '300px', maxWidth: '500' }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum, enim at fugiat fugit commodi ad qui nesciunt eum corrupti expedita? Praesentium fugit officiis eaque consequatur deserunt, libero explicabo repudiandae a?
                        </Typography>

                        <Box sx={{ color: '#666', margin: '25px 0', display: 'flex', gridGap: '50px' }}>
                            <Typography
                                onClick={() => navigate(`/user/${loggedUser}/followers`)}
                                sx={{ fontWeight: 'bold', fontSize: '0.9rem', '&:hover': { color: '#0887f7', cursor: 'pointer' } }}
                            >
                                {data.followers.length} Followers
                            </Typography>
                            <Typography
                                onClick={() => navigate(`/user/${loggedUser}/following`)}
                                sx={{ fontWeight: 'bold', fontSize: '0.9rem', '&:hover': { color: '#0887f7', cursor: 'pointer' } }}

                            >
                                {data.following.length} Following
                            </Typography>
                        </Box>
                    </Box>
                    <PostForm setPosts={setPosts} />
                    <Box>
                        {!posts.length ? (
                            <Typography>
                                There are no posts
                            </Typography>
                        )
                            : (
                                posts.sort((a, b) => b.date - a.date).map(post => (
                                    <Post
                                        id={post._id}
                                        content={post.content}
                                        user={post.author}
                                        timeAgo={timeAgo.format(post.date)}
                                        setPosts={postsSetter}
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

export default MyProfile