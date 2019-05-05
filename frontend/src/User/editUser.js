import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
class EditUser extends Component{
    constructor(props) {
        super(props)
        this.state = {
            userData: this.props.userData
        }
    }
    render(){
        return null;
    };
}
export default EditUser;