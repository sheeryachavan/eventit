import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
class ViewEvent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            eventId: this.props.eventId,
            eventData: undefined
        }
    }
    render(){
        return null;
    };
}
export default ViewEvent;