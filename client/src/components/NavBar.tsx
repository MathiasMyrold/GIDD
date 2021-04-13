import { AppBar, Button, Icon, Toolbar, Menu, MenuItem, makeStyles, ListItem } from '@material-ui/core';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import React, {useState} from 'react'; 
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {  } from '@material-ui/core';

const StyledNotificationMenu = styled.div`
    
`;

const useStyles = makeStyles({
    customWidth: {
        '& div': {
            // this is just an example, you can use vw, etc.
            width: '500px',
            height: '1000px',
            marginTop: '50px',
        }
    }
});

const Navbar = () => {
    const history = useHistory(); 
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const changeToMap = () => {
        history.push('/Map');
    }

    const changeToHomePage = () => {
        history.push('/Activities');
    }

    const changeToMyProfile = () => {
        history.push('/MyProfile');
    }

    const changeToChat = () => {
        history.push('/Chat');
    }

    const handleOpenMenu = (e:any) => {
        setAnchorEl(e.currentTarget);
        
    }

    const handleCloseMenu = (e:any) => {
        setAnchorEl(null)
    }

    return(
        <div>
        <AppBar position="static" style={{display:'flex'}}>
            <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
                <img onClick={changeToHomePage} src={logo}
                    style={{
                        width:"60px", 
                        margin:"3px",
                        cursor:"pointer"
                    }} />
                <Button onClick={changeToHomePage}>Aktiviteter</Button>
                <Button onClick={changeToMap}>Kart</Button>
                <Button>Kalender</Button>
                <Button>Grupper og venner</Button>
                <Button>Leaderboard</Button>
                <div>
                    <IconButton onClick={changeToChat}>
                       <ChatIcon/>
                    </IconButton>
                    <IconButton aria-controls="dropdownNotifications" aria-haspopup="true" 
                        onClick={handleOpenMenu}>
                        <NotificationsIcon/>
                    </IconButton>
                    <IconButton onClick={changeToMyProfile}>   
                        <AccountBoxIcon/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        <Menu
        style={{
                width:"200px",
                    }}
            id="dropdownNotifications"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            className={classes.customWidth}
        >
            <MenuItem onClick={handleCloseMenu}><ListItem>Profile</ListItem></MenuItem>
            <MenuItem onClick={handleCloseMenu}><ListItem>Profile</ListItem></MenuItem>
            <MenuItem onClick={handleCloseMenu}><ListItem>Profile</ListItem></MenuItem>
        </Menu>
    </div>

    )
}

export default Navbar; 


