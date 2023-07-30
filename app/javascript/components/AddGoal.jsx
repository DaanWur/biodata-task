import {Button, Form, Input, Modal, Select, Progress, DatePicker} from "antd";
import React from "react";
import axios from "axios";

const {Option} = Select;


class AddGoal extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
    };

    onFinish = (values) => {


        axios.post("api/v1/goals/create", {...values}, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.handleCancel();
                    return response.data;
                }
                throw new Error("Network error.");
            }).then(() => {
            this.props.reloadGoals();
        })
            .catch((err) => console.error("Error: " + err));

    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    Add new Goal
                </Button>

                <Modal title="Add New Goal ..." open={this.state.visible} onCancel={this.handleCancel} footer={null}>
                    <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
                        <Form.Item name="targetDate" label="Target date"
                                   rules={[{required: true, message: "Please set your target date"}]}>
                            <DatePicker/>
                        </Form.Item>

                        <Form.Item name="description" label="Description"
                                   rules={[{required: true, message: "Please insert your goal description!"}]}>
                            <Input placeholder="Insert your goal description"/>
                        </Form.Item>

                        <Form.Item
                            name="targetValue"
                            label="Target value"
                            rules={[
                                {
                                    required: true,
                                    message: "Please insert your goal Target value!",
                                },
                            ]}
                        >
                            <Input placeholder="Insert your goal Target value"/>

                        </Form.Item>

                        <Form.Item name="startingValue" label="Starting value"
                                   rules={[{required: true, message: "Please insert your goal Starting value!"}]}>
                            <Input placeholder="Insert your goal Starting value"/>
                        </Form.Item>
                        <Form.Item name="timeFrame" label="Interval"
                                   rules={[{required: true, message: "Please insert your goal Interval value!"}]}>
                            <Input placeholder="Insert your goal Interval value"/>
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
            ;
    }
}

export default AddGoal;