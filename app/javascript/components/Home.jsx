import {Layout} from "antd";
import React from "react";
import Goals from "./Goals";
import Heading from "./Header";

const {Content, Footer} = Layout;

function Home() {
    return (
        <Layout className="layout">
            <Heading/>
            <Content style={{padding: "0 50px"}}>
                <div className="site-layout-content" style={{margin: "100px auto"}}>
                    <h1>Goals</h1>
                    <Goals/>
                </div>
            </Content>
        </Layout>
    );
}

export default Home;