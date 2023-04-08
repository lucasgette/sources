
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoginForm from '../components/Form/LoginForm.js'
import PostForm from '../components/Form/PostForm.js'
import Navbar from '../components/Navbar/Navbar'
import Post from '../components/Post/Post.js'
import { getTimeline } from '../helpers/post.js'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'



const HomePage = () => {
    const { user } = useSelector(state => state)
    const { token } = useSelector(state => state)

    console.log(token)

    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        postsSetter()

    }, [])


    const postsSetter = () => {
        getTimeline(token)
            .then(res => { setPosts(res); setLoading(false) })
            .catch(err => {console.log(err); setLoading(false)})

    }


    return (
        <>
            <Navbar />
            {user && (
                <>
                    <p>Welcome {user} </p>
                    <Box sx={{ maxWidth: '700px', margin: 'auto' }}>
                        <PostForm setPosts={setPosts} />
                        {loading
                            ? <Typography>Loading...</Typography>
                            : <Box>
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
                                                setPosts={postsSetter}
                                            />

                                        ))
                                    )
                                }
                            </Box>
                        }
                    </Box>


                </>
            )}
            {!user && <LoginForm />}

        </>
    )
}

export default HomePage 