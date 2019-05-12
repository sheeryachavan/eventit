import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AddEvent from './Event/addEvent';
import { connect } from "react-redux";
class EventContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showUpdateEvent: false,
            showCreateEvent: false,
            showDeleteEvent: false,
            editEvent: null,
            deleteEvent: null
        };
        // this.handleOpenUpdateEvent = this.handleOpenUpdateEvent.bind(this);
        this.handleOpenCreateEvent = this.handleOpenCreateEvent.bind(this);
        this.handleCloseEvents = this.handleCloseEvents.bind(this);
    }


componentDidMount(){
    console.log("events component did mount")
}

    handleCloseEvents() {
        this.setState({ showCreateEvent: false, showUpdateEvent: false, showDeleteEvent: false });
    }
    handleOpenCreateEvent() {
        this.setState({ showCreateEvent: true });
    }
    render(){
        console.log("events component did mount")
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