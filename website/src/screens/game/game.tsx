import { useEffect, useRef, useState } from 'react';
import { Message } from '../../models/message';
import { Game as GameModel } from '../../models/game';
import './index.css';
import { useLocation } from 'react-router-dom';
import { Action } from '../../models/action';

interface GameProps {
    messages: Message[];
    sendMessage: (message: Message) => void;
};

interface LocationState {
    game: GameModel
};

export const Game = ({ messages, sendMessage }: GameProps) => {
    const location = useLocation();
    const hasRetrievedGame = useRef(false);
    const [game, setGame] = useState<GameModel | null>(null);

    useEffect(() => {
        if (!hasRetrievedGame.current) {
            if ((location.state as LocationState)?.game) {
                setGame((location.state as LocationState)?.game);
            } else {
                const latestMessage = JSON.parse(messages[messages.length - 1].data);
                const game = {
                    id: latestMessage.data.id
                }
                setGame(game)
            }
            hasRetrievedGame.current = true;
        }
    }, [location.state, messages]);

    useEffect(() => {
        const latestMessage = messages[messages.length - 1];

        if (game) {
            // do stuff with the game
        } else {
            // use JOIN message to get the game
        }
    }, [messages, location.state]);

    const move = () => {
        const message = {
            action: Action.MOVE,
            game
        };
        //sendMessage(message);
    }

    return (
        <>
        </>
    )
}