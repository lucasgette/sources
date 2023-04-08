import { Avatar, Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlexBetween from '../FlexBetween';
import { margin } from '@mui/system';
import PostSettings from '../Post/PostSettings.js';
import { deletePost } from '../../helpers/post';
import DeleteIcon from '@mui/icons-material/Delete';


const Post = ({ user, content, timeAgo, id, setPosts }) => {

    const loggedUser = useSelector(state => state.user)
    const token = useSelector(state => state.token)

    const handleDeletePost = () => {
        try {
            deletePost({ token, user, id })
                .then(res => console.log(res))
                .catch(err => console.log(err))

            setPosts(id)
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <Box sx={{
            borderBottom: '1px solid #ddd',
            // border: '1px solid #aaa',
            // borderRadius: '15px',
            padding: '15px',
            width: '100%',
            margin: 'auto',
            alignItems: 'start'
        }} >


            <Box sx={{
                display: 'flex',
                // border: '1px solid #aaa',
                // borderRadius: '15px',
                alignItems: 'start'
            }}>

                <Box >
                    <Avatar
                        alt={user.toUpperCase()}
                        src="/static/images/avatar/2.jpg"
                        sx={{
                            width: '50px',
                            height: '50px',
                            margin: '5px',
                        }}
                    />
                </Box>

                <Box padding='0 10px' position='relative' flexGrow={1} >
                    <Box sx={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>

                        <Typography sx={{ color: '#444', position: 'absolute', right: '40px', fontSize: '0.9rem' }}>{timeAgo}</Typography>

                        <Typography sx={{
                            fontSize: '0.9rem', fontWeight: 'bold'
                        }}>@{user}</Typography>

                    </Box>
                    <Typography sx={{ fontSize: '0.9rem', padding: '5px 0' }}>
                        {content}
                    </Typography>
                </Box>


            </Box >
            <FlexBetween sx={{ color: '#444', width: '40%', margin: 'auto', marginTop: '10px' }}>
                <IconButton onClick={() => console.log('Something')} sx={{ p: 0 }}>
                    <ReplyIcon />
                </IconButton>


                <IconButton onClick={() => console.log('Something')} sx={{ p: 0 }}>
                    <FavoriteBorderIcon sx={{ color: 'red' }} />
                </IconButton>
                {loggedUser === user && (
                    <IconButton onClick={() => {
                        const confirmation = window.confirm('Delete tweet?')

                        if (confirmation) {
                            handleDeletePost()
                        }
                        else {
                            return
                        }

                    }} sx={{ p: 0 }}>
                        <DeleteIcon sx={{ color: '#555', margin: '0 5px' }} />
                    </IconButton>
                )}


                {/*                 
                <IconButton onClick={{}} sx={{ p: 0 }}>
                    <FavoriteIcon sx={{ color: 'red' }} />
                </IconButton> */}


            </FlexBetween>
        </Box >
    )
}

export default Post