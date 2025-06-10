import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Game } from '../models/game';
import { deleteGame } from '../services/gamesService';

interface DeleteGameProps {
    game: Game;
    onDeleted?: () => void;
}

const DeleteGame: React.FC<DeleteGameProps> = ({ game, onDeleted }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            await deleteGame(game.id);
            setIsModalOpen(false);
            onDeleted?.();
        } catch (err: any) {
            console.error(err);
        }
    };

    return (
        <>
            <Button type="primary" danger onClick={showModal}>
                Delete
            </Button>
            <Modal
                title="Delete Game"
                closable={{ 'aria-label': 'Close' }}
                open={isModalOpen}
                onOk={handleDelete}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to delete {game.name}?</p>
            </Modal>
        </>
    );
};

export default DeleteGame;