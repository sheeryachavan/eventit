import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import axios from 'axios'
import api from '../api'
import { connect } from "react-redux";
class ViewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.id,
            userData: undefined
        }
    }
    componentWillMount() {
       

    }
    async componentDidMount() {
        if (this.props.id) {
            var url = await api.get(`eventit/user/profile/${this.props.id}`);
            this.setState({
                userData : JSON.stringify(url.data)
            });
            debugger;
        }
    }
    render() {
        return (
            <div>
                {this.state.userData}
            </div>
        );
    };
}

const mapStateToProps = (state) => {

    console.log("home comp redux-state");
    console.log(state);
    return {
        id: state.authentication.id
    };
}

export default connect(mapStateToProps)(ViewUser);