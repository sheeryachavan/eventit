import React, { Component } from 'react'
import ReactModal from 'react-modal';
import { Container, Row, Button } from 'react-bootstrap';
import api from '../api';
import { classnames } from '../helpers';
import { connect } from "react-redux";
import PlacesAutocomplete from 'react-places-autocomplete';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import '../search.css';
ReactModal.setAppElement('#root');
class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateEvent: this.props.isOpen || true,
            selectedFile: null,
            address: '',
            errorMessage: '',
            isGeocoding: false,
            event_title: '',
            event_type: '',
            event_description: '',
            event_date: new Date(),
            event_from_time: "18:00",
            event_to_time: "19:00",
            event_max_participants: 0,
            event_picture: undefined,
            event_keyword:''
        };
        this.handleOpenCreateEvent = this.handleOpenCreateEvent.bind(this);
        this.handleCloseCreateEvent = this.handleCloseCreateEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAllChanges = this.handleAllChanges.bind(this);

    }
    handleOpenCreateEvent() {
        this.setState({ showCreateEvent: true });
    }
    handleCloseCreateEvent() {
        this.setState({ showCreateEvent: false });
        this.props.handleClose(false);
    }
    async handleSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        var userData = await api.get(`eventit/user/profile/${this.props.id}`);


        const data = {
            "event_name": this.state.event_title,
            "event_type": this.state.event_type,
            "event_description": this.state.event_description,
            "event_location": this.state.address,
            "event_date":this.state.event_date,
            "event_end": this.state.event_to_time,
            "event_begin": this.state.event_from_time,
            "event_owner": this.props.id,
            "event_count": this.state.event_max_participants,
            "event_keyword": this.state.event_keyword,
            "event_ownerPhone": userData.data.phone,
            "event_ownerContact": userData.data.user_name,
            "event_ownerName": userData.data.name
        };

        const url = 'http://localhost:3001/eventit/event/addevent';
        var temp = await fetch(url, {
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)


        })
        console.log(data);
        debugger;
        this.setState({ showCreateEvent: false });
        this.props.handleClose(false);
    }
    handleAllChanges = (e) => {
        if (e.target.name === 'event_title') this.setState({ event_title: e.target.value });
        if (e.target.name === 'event_type') this.setState({ event_type: e.target.value });
        if (e.target.name === 'event_description') this.setState({ event_description: e.target.value });
        if (e.target.name === 'event_date') this.setState({ event_date: e.target.value });
        if (e.target.name === 'event_from_time') this.setState({ event_from_time: e.target.value });
        if (e.target.name === 'event_to_time') this.setState({ event_to_time: e.target.value });
        if (e.target.name === 'event_max_participants') this.setState({ event_max_participants: e.target.value });
        // if (e.target.name === 'event_picture') this.setState({ event_picture: e.target.value });
        if (e.target.name === 'event_date') this.setState({ event_date: e.target.value });
        if (e.target.name === 'event_keyword') this.setState({ event_keyword: e.target.value });
    }
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        console.log(event.target.files[0]);
    }
    handleAddressChange = address => {
        this.setState({
            address,
        });
    };

    handleSelect = selected => {
        this.setState({ isGeocoding: true, address: selected });
        debugger;
        geocodeByAddress(selected)
            .then((res) => {
                this.setState({
                    address: res[0]["formatted_address"],
                    isGeocoding: false,
                });
                console.log(res);
            })
            .catch(error => {
                this.setState({ isGeocoding: false });
                console.log('error', error); // eslint-disable-line no-console
            });
    };
    handleCloseClick = () => {
        this.setState({
            address: '',
        });
    };
    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };
    render() {
        const address = this.state.address;
        const errorMessage = this.state.errorMessage;
        const isGeocoding = this.state.isGeocoding;

        let body;
        body = (<div>
            <form
                className='form'
                id='add-Event'
                onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label>
                        Title:
                            <input
                            required
                            autoFocus={true}
                            className="clsTextField"
                            name="event_title"
                            onChange={this.handleAllChanges}
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Type:
                        <input required type='text' className='clsTextField' name="event_type" />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Description:
                        <textarea required className='clsTextField' name="event_description" />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Date:
                        <input required type='date' className='clsTextField' name="event_date" />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Start Time:
                        <input required type='time' className='clsTimeField' name="event_from_time" />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        End Time:
                        <input required type='time' className='clsTimeField' name="event_to_time" />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Max participants:
                        <input required type='number' className='clsTextField' name="event_max_participants" />
                    </label>
                </div>
                <PlacesAutocomplete onChange={this.handleAddressChange}
                    value={address}
                    onSelect={this.handleSelect}
                    onError={this.handleError}
                    shouldFetchSuggestions={address.length > 2}>
                    {
                        ({ getInputProps, suggestions, getSuggestionItemProps }) => {
                            return (
                                <div className='form-group'>
                                    <label>
                                        Address:
                        <input name="event_address" {...getInputProps({
                                            className: 'clsTextField',
                                            required: true,

                                        })} />
                                        {this.state.address.length > 0 && (
                                            <button
                                                className="Demo__clear-button"
                                                onClick={this.handleCloseClick}
                                            > x        </button>
                                        )}
                                        {suggestions.length > 0 && (
                                            <div className="Demo__autocomplete-container">
                                                {suggestions.map(suggestion => {
                                                    const className = classnames('Demo__suggestion-item', {
                                                        'Demo__suggestion-item--active': suggestion.active,
                                                    });

                                                    return (
                                                        /* eslint-disable react/jsx-key */
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, { className })}
                                                        >
                                                            <strong>
                                                                {suggestion.formattedSuggestion.mainText}
                                                            </strong>{' '}
                                                            <small>
                                                                {suggestion.formattedSuggestion.secondaryText}
                                                            </small>
                                                        </div>
                                                    );
                                                    /* eslint-enable react/jsx-key */
                                                })}
                                            </div>
                                        )}
                                    </label>

                                </div>
                            );
                        }
                    }
                </PlacesAutocomplete>
                {/* <div className='form-group'>
                    <label>
                        Upload Cover Photo:
                        <input type='file' onChange={this.fileSelectedHandler} className='clsTextField' name="event_picture" accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp"/>
                    </label>
                </div> */}
                <div className='form-group'>
                    <label>
                        Keywords:
                        <input required type='text' className='clsTextField' name="event_keyword" />
                    </label>
                </div>
                <button type='submit' >
                    Add Event
                            </button>
            </form>

        </div>)
        return (
            <div>
                <ReactModal
                    name='createEvent'
                    isOpen={this.state.showCreateEvent}
                    contentLabel='Add Event'
                    className="addEventCard"
                    >
                    {body}
                    <button onClick={this.handleCloseCreateEvent}>
                        Cancel
                </button>
                </ReactModal>
            </div>
        );
    };
}
const mapStateToProps = (state) => {

    console.log("home comp redux-state");
    console.log(state);
    // state.authentication.id
    return { id: state.authentication.id };
}

export default connect(mapStateToProps)(AddEvent);