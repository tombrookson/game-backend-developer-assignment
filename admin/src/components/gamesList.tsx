import { useEffect, useState } from 'react';
import { getGames } from '../services/gamesService';
import { Game } from '../models/game';
import { Table, Space } from 'antd';
import DeleteGame from './deleteGame';
import UpdateGame from './updateGame';

const GamesList = ({ refreshKey }: { refreshKey: number }) => {
    const [apiData, setApiData] = useState<Game[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [refreshList, setRefreshList] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGames();
                setApiData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load games');
            }
        };

        fetchData();
    }, [refreshKey, refreshList]);

    if (error) return <div>{error} </div>;
    if (!apiData) return <div>Loading...</div>;

    const tableColumns = [
        { title: 'Id', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
        { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
        {
            title: 'Action',
            key: 'action',
            render: (_: string, record: Game) => (
                <Space size="middle">
                    <UpdateGame
                        game={record}
                        onGameUpdated={() => setRefreshList(prev => prev + 1)}
                    />

                    <DeleteGame
                        game={record}
                        onDeleted={() => setRefreshList(prev => prev + 1)}
                    />
                </Space>
            ),
        },
    ]

    return (
        <Table dataSource={apiData} columns={tableColumns} rowKey="id" />
    );
};

export default GamesList;