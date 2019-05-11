import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
class ViewUser extends Component{
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.userId,
            userData: undefined
        }
    }
    render(){
        return null;
    };
}
export default ViewUser;