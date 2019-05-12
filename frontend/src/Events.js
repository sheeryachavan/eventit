import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AddEvent from './Event/addEvent';
import { connect } from "react-redux";
import api from './api'
class EventContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateEvent: false,
            showCreateEvent: false,
            showDeleteEvent: false,
            editEvent: null,
            deleteEvent: null,
            events: undefined
        };
        // this.handleOpenUpdateEvent = this.handleOpenUpdateEvent.bind(this);
        this.handleOpenCreateEvent = this.handleOpenCreateEvent.bind(this);
        this.handleCloseEvents = this.handleCloseEvents.bind(this);
    }


    componentDidMount() {
        console.log("events component did mount")
        this.getEvents();
    }
    async getEvents() {
        var l_objResponse = await api.get("/eventit/event/getAllEvents");
        debugger;
        this.setState({
            events: l_objResponse.data
        });
    }
    handleCloseEvents() {
        this.setState({ showCreateEvent: false, showUpdateEvent: false, showDeleteEvent: false });
    }
    handleOpenCreateEvent() {
        this.setState({ showCreateEvent: true });
    }
    render() {
        console.log("events component did mount");
        let body = null;
        let cards = null;
        if (this.state.events) {
            cards = this.state.events && this.state.events.map(event => (
                <div className="card" key={event.event_id}>
                    <Link to={`/events/${event.event_id}`}>{event.event_name}</Link>

                </div>));
        }
        return (<div>
            <div className="clsCreateButtonContainer">
                <button className='clsCreateButton' onClick={this.handleOpenCreateEvent}>
                    Create Event
                </button>
            </div>
            {this.state &&
                this.state.showCreateEvent && (
                    <AddEvent
                        isOpen={this.state.showCreateEvent}
                        handleClose={this.handleCloseEvents}
                        EventOperation='createEvent'
                    />
                )}
            {cards}
        </div>);
    }
}
// export default EventContainer;
const mapStateToProps = (state) => {

    console.log("home comp redux-state");
    console.log(state);
    // state.authentication.id
    return { id: state.authentication.id };
}

export default connect(mapStateToProps)(EventContainer);