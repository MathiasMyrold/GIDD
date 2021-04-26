import React, { useEffect, useState } from 'react';
import Group from '../../interfaces/Group';
import User from '../../interfaces/User';
import { Avatar, Card, makeStyles } from '@material-ui/core';
import './GroupLeaderboard.css';
import GroupsAndFriends from '../../containers/GroupsAndFriends';

const useStyles = makeStyles({
    root: {
        minWidth: 150,
        margin: '3rem 1rem',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
interface Props {
    title?: string;
    propUsers: User[];
}

interface Placements {
    user: User;
    position: number;
}

const GroupLeaderboard: React.FC<Props> = ({ title, propUsers }: Props) => {
    const [users, setUsers] = useState<User[]>(propUsers);
    const [placements, setPlacements] = useState<Placements[]>([]);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const classes = useStyles();

    const sortPoints = (): User[] => {
        return propUsers.sort((u1, u2) => {
            if (u1.points > u2.points) return -1;
            else if (u1.points < u2.points) return 1;
            else return 0;
        });
    };

    const getPosition = (user: User): number => {
        let position = 0;
        placements.forEach((p) => {
            if (p.user === user) position = p.position;
        });
        return position;
    };

    const getPlacements = () => {
        const placements: Placements[] = [];
        const sorted = sortPoints();
        for (let i = 0; i < sorted.length; i++) {
            placements.push({ user: sorted[i], position: 1 });
        }
        let currentPos = 1;
        let nextPos = 1;
        for (let i = 0; i < placements.length - 1; i++) {
            placements[i].position = currentPos;
            nextPos++;
            if (+placements[i].user.points > +placements[i + 1].user.points) {
                currentPos = nextPos;
            }
            if (i === placements.length - 2) {
                placements[i + 1].position = currentPos;
            }
        }
        setPlacements(placements);
    };

    const getTotalPoints = () => {
        let sum = 0;
        users.forEach((user) => {
            sum += +user.points;
        });
        setTotalPoints(sum);
    };

    //The max margin-left is 52rem
    const getMarginLeft = (user: User) => {
        return ((+user.points / totalPoints) % 1) * 100;
    };

    useEffect(() => {
        getPlacements();
        getTotalPoints();
    }, []);

    const renderPlayers = users.map((user, index: number) => {
        return (
            <div className="groupleaderboard__players" key={index}>
                <hr className="groupleaderboard__line" />
                <div className="groupleaderboard__player">
                    <div
                        /* The max margin-left is 52rem*/
                        style={{
                            margin: `0.7rem 0.5rem 0.5rem `,
                            marginLeft: `${getMarginLeft(user)}%`,
                            display: 'flex',
                            flex: '1',
                        }}
                    >
                        <h6 className="groupleaderboard__name">
                            {user.firstName}
                        </h6>
                        <Avatar />
                    </div>
                    <div className="groupleaderboard__stats">
                        <h5 className="groupleaderboard__stat1">
                            {getPosition(user)}rd Place
                        </h5>
                        <h5 className="groupleaderboard__stat2">
                            {user.points} points
                        </h5>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <Card className={classes.root}>
            {title !== undefined && (
                <div className="groupleaderboard__header">
                    <h1>{title}</h1>
                </div>
            )}
            {renderPlayers}
            <hr className="groupleaderboard__line" />
        </Card>
    );
};

export default GroupLeaderboard;
