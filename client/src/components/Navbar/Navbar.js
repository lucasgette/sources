import React from 'react'
import FlexBetween from '../FlexBetween'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import SettingsList from './SettingsList';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { user } = useSelector(state => state)
    const navigate = useNavigate()


    return (
        <FlexBetween sx={{
            padding: '15px 6%',
            backgroundColor: '#0887f7',
            color: '#fff',
            boxShadow: '1px 1px 5px #999'

        }}>
            <Typography
                onClick={() => navigate(`/`)}


                sx={{
                    fontSize: '1.5rem',
                    letterSpacing: '1px',
                    fontWeight: '600',
                    transition: 'color 0.3s ease-in',
                    "&:hover": {
                        cursor: 'pointer',
                        color: '#e3e3e3',
                    }
                }}>Soziales Netzwerk</Typography>

            {user ? (<SettingsList user={user} />) : (

                <EmojiEmotionsIcon sx={{
                    fontSize: '2rem',
                    letterSpacing: '1px',
                    fontWeight: '600',
                    transition: 'color 0.3s ease-in',
                    "&:hover": {
                        cursor: 'pointer',
                        color: '#e3e3e3',
                    }
                }} />

            )}


        </FlexBetween>
    )
}

export default Navbar