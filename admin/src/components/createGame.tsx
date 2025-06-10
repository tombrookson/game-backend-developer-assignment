import { useState } from 'react';
import { postGame } from '../services/gamesService';
import { Game } from '../models/game';
import type { FormProps } from 'antd';
import { Button, Form, Input, InputNumber, Modal, Select, Alert } from 'antd';

const CreateGame = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    type FieldType = {
        id: string;
        name: string;
        releaseYear: number;
        publisher: string;
        playersMin: number;
        playersMax: number;
        type: Game['type'];
        expansions: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const game: Game = {
            id: values.id,
            name: values.name,
            releaseYear: values.releaseYear,
            publisher: values.publisher,
            players: {
                min: values.playersMin,
                max: values.playersMax,
            },
            type: values.type,
            expansions: (values.expansions ?? '').split(',').map(e => e.trim()).filter(e => e !== ''),
        };

        try {
            await postGame(game);
            setIsModalOpen(false);
            setFormError(null);
        } catch (error: any) {
            console.log(error);
            setFormError(error?.message ?? 'Something went wrong.');
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add Game
            </Button>
            <Modal
                title="Add Game"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item name="id" label="Game ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="releaseYear" label="Release Year" rules={[{ required: true, min: 1800 }]}>
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
                            Create
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

export default CreateGame;
