import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../FlexBetween';
import DeleteIcon from '@mui/icons-material/Delete';



function PostSettings({ sx, deletePost }) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const user = useSelector(state => state.user)


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuItemStyles = { width: '150px' }



    return (
        <Box sx={{ flexGrow: 0, ...sx }}>
            <FlexBetween>

                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <MoreVertIcon />
                    </IconButton>
                </Tooltip>
            </FlexBetween>
            <Menu
                sx={{  width: '600px', position: 'absolute'}}
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
                <MenuItem key='profile' onClick={handleCloseUserMenu} sx={{...menuItemStyles}}>
                    <DeleteIcon sx={{color:'#555', margin: '0 5px'}}/>
                    <Typography sx={{color:'#555', margin: '0 5px', fontSize: '0.8rem'}}>Delete tweet</Typography >
                </MenuItem>






            </Menu>
        </Box>
    );
}
export default PostSettings;