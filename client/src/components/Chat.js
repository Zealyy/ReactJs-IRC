import UserService from "../services/user.service";
import React, { Component } from "react";
import Channel from "./Channel";
import handleNewChild from "../scripts/handleNewChild"


class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            channels: new Map(),
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
        this.renderChannel = (name) => {
            return (
                <Channel title={name} username={this.state.username} onSetUpId={handleNewChild} parent={this} />
            );
        }
    }


    render() {
        return (
            <div className="Chat">
                <div className="container" id="global">
                    <div className="row">
                        <div className="col-12">
                            <Channel title={"Global Chat"} username={this.state.username} onSetUpId={handleNewChild} parent={this} />
                        </div>
                    </div>
                </div>
                <div className="container" id="channels">
                    <div className="row">
                            
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;