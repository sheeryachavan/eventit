import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import api from '../api'
class ViewEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventId: undefined,
            eventData: undefined
        }
    }
    componentDidMount() {
        debugger;
        this.setState({ eventId: this.props.match.params.id });
        this.getEvent();
    }
    async getEvent() {
        const l_objResponse = await api.get(`/eventit/event/getevent/${this.props.match.params.id}`);
        this.setState({ eventData: l_objResponse.data });
        debugger;
    }
    render() {
        return null;
    };
}
export default ViewEvent;