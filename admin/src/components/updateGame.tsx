import { useState } from 'react';
import { putGame } from '../services/gamesService';
import { Game } from '../models/game';
import type { FormProps } from 'antd';
import { Button, Form, Input, InputNumber, Modal, Select, Alert } from 'antd';

const UpdateGame = ({
    game,
    onGameUpdated,
}: {
    game: Game;
    onGameUpdated: () => void;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [form] = Form.useForm();

    const showModal = () => {
        form.setFieldsValue({
            name: game.name,
            releaseYear: game.releaseYear,
            publisher: game.publisher,
            playersMin: game.players.min,
            playersMax: game.players.max,
            type: game.type,
            expansions: game.expansions.join(', '),
        });
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    type FieldType = {
        name: string;
        releaseYear: number;
        publisher: string;
        playersMin: number;
        playersMax: number;
        type: Game['type'];
        expansions: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const updatedGame: Omit<Game, 'id'> = {
            name: values.name,
            releaseYear: values.releaseYear,
            publisher: values.publisher,
            players: {
                min: values.playersMin,
                max: values.playersMax,
            },
            type: values.type,
            expansions: (values.expansions ?? '')
                .split(',')
                .map((e) => e.trim())
                .filter((e) => e !== ''),
        };

        try {
            await putGame(game.id, updatedGame);
            setIsModalOpen(false);
            onGameUpdated();
            setFormError(null);
        } catch (error: any) {
            console.log(error);
            setFormError(error?.message ?? 'Something went wrong.');
        }
    };

    return (
        <>
            <Button type='primary' onClick={showModal}>Edit</Button>
            <Modal
                title={`Update Game: ${game.name}`}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="releaseYear"
                        label="Release Year"
                        rules={[
                            { required: true, message: 'Release Year is required' },
                            { type: 'number', min: 1800, message: 'Release year must be at least 1800' },
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item name="publisher" label="Publisher" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="playersMin" label="Min Players" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>

                    <Form.Item name="playersMax" label="Max Players" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} min={1} />
                    </Form.Item>

                    <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                        <Select placeholder="Select a type">
                            <Select.Option value="BaseGame">Base Game</Select.Option>
                            <Select.Option value="Expansion">Expansion</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="expansions" label="Expansions (comma separated)">
                        <Input placeholder="e.g. 2,3,4" />
                    </Form.Item>

                    {formError && (
                        <Form.Item>
                            <Alert message={formError} type="error" showIcon />
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save Changes
                        </Button>
                        <Button onClick={handleCancel} style={{ marginLeft: '8px' }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateGame;
