import { ContentCopy } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Action } from "../../models/action";
import { Message } from "../../models/message";
import styled from "styled-components";

interface HomeProps {
  messages: Message[];
  sendMessage: (message: Message) => void;
}

export function Home({ messages, sendMessage }: HomeProps) {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [hasCreated, setCreated] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(
    "Start playing using the button below!"
  );
  const [url, setURL] = useState("");

  const handleJoin = useCallback(
    (data) => {
      const game = {
        id: data.id,
      };
      navigate(`/game/${data.id}`, { state: { game } });
    },
    [navigate]
  );

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
  }, [messages, handleJoin]);

  const StyledCreateButton = styled(Button)``;

  const handleCreate = (data) => {
    setDisplayMessage(
      "Game created, your opponent can join using the link below"
    );
    setURL(
      `${window.location.protocol}//${window.location.host}/game/${data.id}`
    );
    setCreated(true);
  };

  const handleCreateClick = () => {
    setLoading(true);
    const message = {
      action: Action.CREATE,
      data: "",
    };
    send(message);
  };

  const send = (data: Message) => {
    sendMessage(data);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Typography>Four</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{displayMessage}</Typography>
        </Grid>

        {hasCreated && (
          <Grid item xs={4} md={2}>
            <span>
              <TextField
                label="URL"
                size="small"
                variant="outlined"
                defaultValue={url}
                disabled
              />
              <IconButton aria-label="copy" onClick={handleCopy}>
                <ContentCopy />
              </IconButton>
            </span>
          </Grid>
        )}
        <Grid item xs={4} md={2}>
          <StyledCreateButton
            variant="contained"
            disabled={loading || hasCreated}
            onClick={handleCreateClick}
            fullWidth={true}
          >
            {loading && <CircularProgress size={24}></CircularProgress>}
            {!loading && <Typography>Create Game</Typography>}
          </StyledCreateButton>
        </Grid>
      </Grid>
    </>
  );
}
