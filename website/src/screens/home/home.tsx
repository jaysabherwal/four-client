import { ContentCopy } from '@mui/icons-material';
import { Button, Card, CircularProgress, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Action } from '../../models/action';
import { Message } from '../../models/message';
import './index.css';

interface HomeProps {
    messages: Message[];
    sendMessage: (message: Message) => void;
}

export function Home({ messages, sendMessage }: HomeProps) {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [hasCreated, setCreated] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('Start playing using the button below!');
    const [url, setURL] = useState('');

    useEffect(() => {
        const latestMessage = messages[messages.length - 1];

        switch (latestMessage?.action) {
            case Action.CREATE:
                handleCreate(latestMessage.data);
                break;
            case Action.JOIN:
                handleJoin(latestMessage.data);
                break;
        }
    }, [messages]);

    const handleCreate = (data) => {
        setDisplayMessage('Game created, your opponent can join using the link below');
        setURL(`${window.location.protocol}//${window.location.host}/game/${data.id}`);
        setCreated(true);
    };

    const handleJoin = useCallback((data) => {
        const game = {
            id: data.id
        }
        navigate(`/game/${data.id}`, { state: { game } });
    }, [navigate]);

    const handleCreateClick = () => {
        setLoading(true);
        const message = {
            action: Action.CREATE,
            data: ''
        }
        send(message);
    };

    const send = (data: Message) => {
        sendMessage(data);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url)
    }

    const paperSx = {
        p: 2,
        margin: 'auto',
        width: '40%',
        maxHeight: '50%',
        flexGrow: 1,
        backgroundColor: '#808080'
    }

    return (
        <>
            <Paper sx={paperSx}>
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Grid item>
                        <Typography>
                            Four
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            {displayMessage}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {hasCreated && (
                            <span>
                                <TextField label="URL" size="small" variant="outlined" defaultValue={url} disabled />
                                <IconButton aria-label="copy" onClick={handleCopy}>
                                    <ContentCopy/>
                                </IconButton>
                            </span>
                        )}
                    </Grid>
                    <Grid item>
                        {loading && (<CircularProgress size={24}></CircularProgress>)}
                    </Grid>
                    <Grid item>
                        <Button variant="contained" disabled={loading || hasCreated} onClick={handleCreateClick}>
                            <Typography>
                                Create Game
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}