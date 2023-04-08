import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../FlexBetween';
import { getMyProfile } from '../../helpers/users';


function SettingsList() {

    const [data, setData] = React.useState(null)
    const [error, setError] = React.useState(null)
    const { user, token } = useSelector(state => state)

    React.useEffect(() => {
        getMyProfile(token)
            .then(res => setData(res.data))
            .catch(error => setError(error.response.data.error))

    }, [token])

    console.log(user)

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuItemStyles = { width: '150px', pl: '30px' }


    return (
        <Box sx={{ flexGrow: 0 }}>
            <FlexBetween>

                <Typography color='#fff' margin='0 5px' fontWeight='500'>{user}</Typography>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={user.toUpperCase()} src={data && `http://localhost:3001/${data.avatar}`} />
                    </IconButton>
                </Tooltip>
            </FlexBetween>
            <Menu
                sx={{ mt: '45px', width: '600px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key='profile' onClick={() => { handleCloseUserMenu(); navigate('/my-profile') }} sx={menuItemStyles}>
                    <Typography textAlign="center">My Profile</Typography >
                </MenuItem>

                <MenuItem key='posts' onClick={handleCloseUserMenu} sx={menuItemStyles}>
                    <Typography textAlign="center">My posts</Typography>
                </MenuItem>

                <MenuItem
                    key='logout'
                    sx={menuItemStyles}
                    onClick={() => {
                        handleCloseUserMenu()
                        dispatch(setLogout())
                        navigate('/')
                    }
                    }>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>


            </Menu>
        </Box>
    );
}
export default SettingsList;