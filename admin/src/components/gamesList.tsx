import { useEffect, useState } from 'react';
import { getGames } from '../services/gamesService';
import { Game } from '../models/game';
import { Table } from 'antd';

const GamesList = () => {
    const [apiData, setApiData] = useState<Game[] | null>(null);
    const [error, setError] = useState<string | null>(null);

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
    }, []);

    if (error) return <div>{error} </div>;
    if (!apiData) return <div>Loading...</div>;

    const tableColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Year', dataIndex: 'releaseYear', key: 'releaseYear' },
        { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
    ]

    return (
        <Table dataSource={apiData} columns={tableColumns} rowKey="id" />
    );
};

export default GamesList;