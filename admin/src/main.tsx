import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "antd";
import GamesList from "./components/gamesList";

const root = document.getElementById("root");
if (!root) {
    throw new Error("No root element found to mount the app");
}

const { Header, Content } = Layout;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <Layout>
            <Header style={{ color: "white", fontSize: "20px" }}>Admin</Header>
            <Content>
                <GamesList />
            </Content>
        </Layout>
    </React.StrictMode>
);
