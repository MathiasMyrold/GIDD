import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Typography,
    withStyles,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import Group from '../../interfaces/Group';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Popup from '../Popup';
import ActivityForm from '../ActivityComponents/ActivityForm';
import { useState } from 'react';
import ActivityCard from '../ActivityComponents/ActivityCard';
import ActivityResponse from '../../interfaces/ActivityResponse';
import { useEffect } from 'react';
import axios from '../../Axios';
import User from '../../interfaces/User';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
import ActivityInformation from '../ActivityComponents/ActivityInformation';
import UserAvatar from '../UserAvatar';
import GroupLeaderboard from '../LeaderboardComponents/GroupLeaderboard';
import config from '../../Config';

const StyledHeader = styled.h2`
    text-align: center;
    font-size: 30px;
`;

const StyledParagraph = styled.p`
    font-size: 10px;
`;

const FeedContainer = styled.div`
    margin-left: 20px;
    min-height: 60%;
`;

const StyledCard = withStyles({
    root: {
        marginBottom: '1rem',
        marginLeft: '1rem',
        marginTop: '1rem',
        minHeigth: '60%',
    },
})(Card);

const ActivityDiv = styled.div`
    margin: 5%;
    width: 50%;
    height: 60vh;
`;

const TransformDiv = styled.div`
    transition: transform 450ms;
    min-width: 200px;
    max-width: 20%;
    max-height: 20%;
    margin-top: 5%;
    margin-bottom: 11rem;

    :hover {
        transform: scale(1.08);
        cursor: pointer;
    }
`;

const StyledActivities = styled.div`
    display: flex;
    border: 2px solid green;
    margin: 1%;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;
`;

const StyledActivity = styled.div`
    object-fit: contain;
    width: 100%;
    max-height: 100px;
    margin-right: 10px;
`;

const StyledButtons = styled.div`
    display: flex;
    padding: 1rem;
    justify-content: center;
`;

const useStyles = makeStyles({
    createButton: {
        width: '50%',
        fontSize: '9px',
        margin: '1%',
        top: '10vh',
    },
    button: {
        width: '50%',
        fontSize: '9px',
        margin: '1%',
    },
});

interface Props {
    selectedGroup: Group;
    updateGroups: () => void;
    leaveGroup: () => void;
    deleteGroup: () => void;
}

export default function FeedCard({
    selectedGroup,
    updateGroups,
    leaveGroup,
    deleteGroup,
}: Props) {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const [openChoiceBox, setOpenChoiceBox] = useState<boolean>(false);
    const [nextActivity, setNextActivity] = useState<ActivityResponse>();
    const [openActivityPopup, setOpenActivityPopup] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User>({
        firstName: '',
        surname: '',
        userId: '',
        email: '',
        image: '',
        password: '',
        phoneNumber: '',
        activityLevel: '',
        points: '',
    });
    const { user } = useContext(UserContext);

    const getNextActivity = async () => {
        const url = `group/${selectedGroup.groupId}/activity`;
        await axios
            .get(url, config)
            .then(async (response) => {
                console.log(response.data['activities']);
                const nextAct = await sortNextActivity(
                    response.data['activities']
                );
                setNextActivity(nextAct);
            })
            .then(() => updateGroups())
            .catch((error) => {
                console.log(error.response);
            });
    };

    const sortNextActivity = async (activities: ActivityResponse[]) => {
        const now = new Date().getTime();
        console.log(now);
        let currActivity = activities[0];
        activities.forEach((activity) => {
            if (
                currActivity.time < now ||
                (activity.time < currActivity.time && activity.time >= now)
            ) {
                console.log(activity);
                console.log(currActivity);
                currActivity = activity;
            }
        });
        return currActivity;
    };

    useEffect(() => {
        getNextActivity();
    }, [selectedGroup, openPopup]);

    const handleUserClicked = (userClicked: User) => {
        if (
            Object.values(userClicked)[0].toString() !== user &&
            user === Object.values(selectedGroup.owner)[0].toString()
        ) {
            setSelectedUser(userClicked);
            setOpenChoiceBox(!openChoiceBox);
        }
    };

    const register = (activityId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            axios.delete(`/user/${user}/activity/${activityId}`, config);
            resolve();
        });
    };

    const unRegister = (activityId: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            axios.post(
                '/user/activity',
                {
                    userId: user,
                    activityId: activityId,
                },
                config
            );
            resolve();
        });
    };

    const handleLeaveGroup = () => {
        leaveGroup();
        updateGroups();
    };

    const deleteActivity = (id: number) => {
        axios
            .delete(`/activity/${id}`, config)
            .then(getNextActivity)
            .then(() => window.location.reload());
    };

    const handleOnChangeOwner = () => {
        const url = `/group/${selectedGroup.groupId}`;
        console.log(Object.values(selectedUser)[0]);
        axios
            .put(
                url,
                {
                    groupId: selectedGroup.groupId,
                    newOwner: Object.values(selectedUser)[0],
                },
                config
            )
            .then((response) => {
                console.log(response);
            })
            .then(() => {
                updateGroups();
                setOpenChoiceBox(!openChoiceBox);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const isDisabled = (): boolean => {
        if (selectedGroup.owner.userId == user) return false;
        else return true;
    };

    return selectedGroup.groupName !== '' ? (
        <StyledCard raised={true}>
            <StyledHeader>{selectedGroup.groupName}</StyledHeader>
            <Divider variant="middle" />
            <List
                style={{
                    width: '40%',
                    float: 'right',
                    maxHeight: '160px',
                    overflow: 'auto',
                }}
            >
                {selectedGroup.users.map((user, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={() => handleUserClicked(user)}
                    >
                        <UserAvatar
                            user={user}
                            type="small"
                            marginRight="0.5rem"
                        ></UserAvatar>
                        {Object.values(user)[0] ==
                        Object.values(selectedGroup.owner)[0] ? (
                            <ListItemText
                                primary={
                                    user.firstName +
                                    ' ' +
                                    user.surname +
                                    '(eier)'
                                }
                            />
                        ) : (
                            <ListItemText
                                primary={user.firstName + ' ' + user.surname}
                            />
                        )}
                    </ListItem>
                ))}
                <Dialog
                    open={openChoiceBox}
                    onClose={() => setOpenChoiceBox(false)}
                >
                    <DialogTitle>
                        {'Vil du gjøre' +
                            selectedUser.firstName +
                            ' ' +
                            selectedUser.surname +
                            ' til eier av gruppen?'}
                    </DialogTitle>
                    <DialogActions>
                        <Button
                            onClick={() => handleOnChangeOwner()}
                            color="primary"
                        >
                            Ja
                        </Button>
                        <Button
                            onClick={() => setOpenChoiceBox(!openChoiceBox)}
                            color="primary"
                            autoFocus
                        >
                            Nei
                        </Button>
                    </DialogActions>
                </Dialog>
            </List>
            <ActivityDiv>
                <Typography variant="h6">Neste aktvitet</Typography>
                <TransformDiv>
                    {nextActivity ? (
                        <ActivityCard
                            activity={nextActivity}
                            openPopup={openActivityPopup}
                            setOpenPopup={setOpenActivityPopup}
                            setActivity={setNextActivity}
                        ></ActivityCard>
                    ) : (
                        <StyledParagraph>
                            Finner ingen aktivitet aktiviteter for denne
                            gruppen, legg til en ny aktivitet!
                        </StyledParagraph>
                    )}
                </TransformDiv>
                <Button
                    className={classes.createButton}
                    onClick={() => setOpenPopup(!openPopup)}
                    variant="contained"
                    color="primary"
                >
                    {' '}
                    Opprett ny gruppeaktivitet{' '}
                    <AddIcon style={{ marginLeft: '8px' }} />
                </Button>
                <Popup
                    title="Legg til aktivitet"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    maxWidth="md"
                >
                    <ActivityForm
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}
                        groupId={selectedGroup.groupId}
                    />
                </Popup>
            </ActivityDiv>
            {nextActivity && (
                <Popup
                    openPopup={openActivityPopup}
                    setOpenPopup={setOpenActivityPopup}
                    maxWidth="md"
                >
                    <ActivityInformation
                        register={register}
                        unRegister={unRegister}
                        deleteActivity={deleteActivity}
                        activity={nextActivity}
                        setOpenPopup={setOpenActivityPopup}
                        openPopup={openActivityPopup}
                    />
                </Popup>
            )}
            <GroupLeaderboard users={selectedGroup.users} />
            <StyledButtons>
                <Button
                    className={classes.button}
                    onClick={handleLeaveGroup}
                    variant="contained"
                    color="primary"
                >
                    {' '}
                    Forlat Gruppe <DeleteIcon style={{ marginLeft: '8px' }} />
                </Button>
                <Button
                    className={classes.button}
                    onClick={deleteGroup}
                    variant="contained"
                    color="primary"
                    disabled={isDisabled()}
                >
                    {' '}
                    Slett Gruppe <DeleteIcon style={{ marginLeft: '8px' }} />
                </Button>
            </StyledButtons>
        </StyledCard>
    ) : (
        <FeedContainer>
            <h2>Ingen gruppe valgt</h2>
        </FeedContainer>
    );
}
