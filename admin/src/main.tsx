import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "antd";
import GamesList from "./components/gamesList";
import CreateGame from "./components/createGame";

const root = document.getElementById("root");
if (!root) throw new Error("No root element found to mount the app");

const { Header, Content } = Layout;

const App = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    return (
        <Layout>
            <Header style={{ color: "white", fontSize: "20px" }}>Admin</Header>
            <Content>
                <CreateGame onGameCreated={triggerRefresh} />
                <GamesList refreshKey={refreshKey} />
            </Content>
        </Layout>
    );
};

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);