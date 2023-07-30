import {Table, message, Popconfirm, Progress} from "antd";
import React from "react";
import AddGoal from "./AddGoal";
import axios from "axios";


class Goals extends React.Component {
    columns = [{
        title: "Target Date", dataIndex: "targetDate", key: "targetDate",
    }, {
        title: "Description", dataIndex: "description", key: "description",
    }, {
        title: "Target Value", dataIndex: "targetValue", key: "targetValue",
    }, {
        title: "Starting value", dataIndex: "startingValue", key: "startingValue",
    }, {
        title: "Interval", dataIndex: "timeFrame", key: "timeFrame",
    }, {
        title: "Completion rate", dataIndex: "complemetionRate", key: "complemetionRate",
    }, {
        title: "Created at", dataIndex: "created_at", key: "created_at",
    }, {
        title: "",
        key: "action",
        render: (_text, record) => (
            <Popconfirm title="Are you sure to delete this goal?" onConfirm={() => this.deleteGoal(record.id)}
                        okText="Yes" cancelText="No">
                <a href="#" type="danger">
                    Delete{" "}
                </a>
            </Popconfirm>),
    },];

    state = {
        goals: [],
    };

    componentDidMount() {
        this.loadGoals();
    }

    loadGoals = () => {
        const url = "api/v1/goals/index";
        fetch(url)
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .then((data) => {
                data.forEach((goal) => {
                    const {oneDay, todayDate, end, q, d} = this.getDates(goal);
                    const newEl = {
                        key: goal.id,
                        id: goal.id,
                        targetDate: goal.targetDate.slice(0, 10),
                        description: goal.description,
                        targetValue: goal.targetValue,
                        startingValue: goal.startingValue,
                        timeFrame: goal.timeFrame,
                        complemetionRate: <Progress type="circle"
                                                    percent={Math.round((q / d) * 100)}
                                                    format={(percent) => `${Math.round(Math.abs((end - todayDate) / oneDay))} Days`}/>,
                        created_at: goal.created_at.slice(0, 10),
                    };

                    this.setState((prevState) => ({
                        goals: [...prevState.goals, newEl],
                    }));
                });
            })
            .catch((err) => message.error("Error: " + err));
    };

    getDates(goal) {
        const endDate = goal.targetDate.slice(0, 10).split("-");
        const today = new Date().toISOString().slice(0, 10).split("-");
        const oneDay = 24 * 60 * 60 * 1000;
        const todayDate = new Date(+today[0], +today[1], +today[2]);
        const end = new Date(+endDate[0], +endDate[1], +endDate[2]);
        const creation = goal.created_at.slice(0, 10).split("-");
        const created = new Date(+creation[0], +creation[1], +creation[2]);
        const q = Math.abs((todayDate - created) / oneDay);
        const d = Math.abs((end - created) / oneDay);
        return {oneDay, todayDate, end, q, d};
    }

    reloadGoals = () => {
        this.setState({goals: []});
        this.loadGoals();
    };

    deleteGoal = (id) => {
        const url = `api/v1/goals/${id}`;

        fetch(url, {
            method: "delete",
        })
            .then((data) => {
                if (data.ok) {
                    this.reloadGoals();
                    return data.json();
                }
                throw new Error("Network error.");
            })
            .catch((err) => message.error("Error: " + err));
    };

    render() {
        return (<>
            <Table className="table-striped-rows" dataSource={this.state.goals} columns={this.columns}
                   pagination={{pageSize: 5}}/>

            <AddGoal reloadGoals={this.reloadGoals}/>
        </>);
    }
}

export default Goals;