import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
class EditEvent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            eventData: this.props.eventData
        }
    }
    render(){
        return null;
    };
}
export default EditEvent;