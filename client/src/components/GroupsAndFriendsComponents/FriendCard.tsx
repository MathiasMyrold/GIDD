import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Tooltip,
    Chip,
} from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import Popup from '../Popup';
import UserProfile from './UserProfile';

const CardInformation = styled.div`
    height: 100%;

    :hover {
        background-color: #ebebeb;
    }
`;
const TitleArea = styled.div`
    flex: 1;
    padding: 15px;
    color: white;
    background-color: #f44336;
`;


const FriendCard = ({friend}: any) =>{
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    return (
        <Card
            style={{ minWidth: '100px', maxWidth: '100%', margin: '5px' }}
            onClick={() => setOpenPopup(!openPopup)}
        >
            <Popup
                title={friend.name}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserProfile friend={friend}/>
            </Popup>
            <CardInformation>
                <Grid container spacing={2}>
                <Grid item xs={3}>
                    <CardMedia
                        component="img"
                        alt={'Image related to the activity' }
                        height="40px"
                        width="40px"
                        image={logo} // hente bildet frå aktiviteta
                    />
                </Grid>
                <Grid item >
                    <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="h3"
                    >
                        {friend.name}
                    </Typography>
                </Grid>
                </Grid>
            </CardInformation>
        </Card>
    );
};

export default FriendCard;