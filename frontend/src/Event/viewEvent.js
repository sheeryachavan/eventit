import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import api from '../api';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
class ViewEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventId: undefined,
            eventData: undefined
        }
        this.registerClick = this.registerClick.bind(this);
    }
    componentDidMount() {
        this.setState({ eventId: this.props.match.params.id });
        this.getEvent();
    }
    async getEvent() {
        const l_objResponse = await api.get(`/eventit/event/getevent/${this.props.match.params.id}`);
        this.setState({ eventData: l_objResponse.data });
    }
    async registerClick() {
        const l_objResponse = await api.get(`/eventit/event/getevent/${this.props.match.params.id}`);
    }
    render() {
        let actionBtn = null;
        if (this.props.id != null) {
            actionBtn = <Link to={`/events/editevent/${this.props.match.params.id}`}><button> Update Event</button></Link>
        }
        else
            actionBtn = <button> Register</button>
        return (<div>
            {actionBtn}
        </div>);
    };
}
const mapStateToProps = (state) => {

    console.log("home comp redux-state");
    console.log(state);
    return {
        id: state.authentication.id
    };
}

export default connect(mapStateToProps)(ViewEvent);
// export default ViewEvent;