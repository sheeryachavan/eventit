import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import axios from 'axios'
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
        if (this.props.id) {
            var config = {
                headers: { 'Access-Control-Allow-Origin': "*" }
            };
            this.setState({ userData: axios.get(`localhost:3001/eventit/user/profile/${this.props.id}`, config) });
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