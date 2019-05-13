import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import AddEvent from './Event/addEvent';
import { connect } from "react-redux";
import api from './api'
import './Events.css';
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

    componentWillReceiveProps(nextProps, nextState) {
       
        this.getEvents()
    }
    componentDidMount() {
        console.log("events component did mount");
        console.log(this.props);

        this.getEvents();
    }
    async getEvents() {
        var l_objResponse;
        
        if (this.props.location && this.props.location.address) {

            var splitAdd = (this.props.location.address.address).split(',');
            var nearby = (splitAdd.length > 2) ? splitAdd[splitAdd.length - 3].trim() : (splitAdd.length > 2) ? splitAdd[splitAdd.length - 2] : splitAdd[0];
            l_objResponse = await api.get(`/eventit/event/getAllEvents/${nearby}`);
        }
        // else if(this.props.location && this.props.location.query){
        //     console.log(this.props.location.query)
        //     debugger;
        // }
        // else if(this.props.userId) {
        //     l_objResponse = await api.get(`/eventit/event/getOwnedEvents/${this.props.userID}`);
        // }
        else {
            l_objResponse = await api.get("/eventit/event/getAllEvents");
        }
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
            debugger;
            cards = this.state.events && (this.state.events).map(event => (
                <div className="eventCard col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    <div className="eventCardContainer">
                        <h4><b>{event.event_name}</b></h4>
                        <Link to={`/events/${event.event_id}`}>{event.event_name}</Link>
                    </div>
                </div>
            ));
        }
        return (<div className="col-lg-12 ">
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
            <div className="clsEventContainer">
                {cards}
            </div>

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