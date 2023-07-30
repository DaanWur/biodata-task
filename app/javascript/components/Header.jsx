import React from "react";
import {Layout, Menu} from "antd";

const {Header} = Layout;

function Heading() {
    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">Home</Menu.Item>
            </Menu>
        </Header>
    );
}

export default Heading;