import React, { Component } from 'react'
import ReactModal from 'react-modal';
import { Container, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { classnames } from '../helpers';
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
        };
        this.handleOpenCreateEvent = this.handleOpenCreateEvent.bind(this);
        this.handleCloseCreateEvent = this.handleCloseCreateEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOpenCreateEvent() {
        this.setState({ showCreateEvent: true });
    }
    handleCloseCreateEvent() {
        this.setState({ showCreateEvent: false });
        this.props.handleClose(false);
    }
    handleSubmit(event) {
        event.preventDefault();
        // const data = new FormData(event.target);

        // fetch('/api/form-submit-url', {
        //     method: 'POST',
        //     body: data,
        // });
        this.setState({ showCreateEvent: false });
        this.props.handleClose(false);
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
                        />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Description:
                        <input required type='textarea' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Date:
                        <input required type='date' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        From Time:
                        <input required type='time' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        To Time:
                        <input required type='time' className='clsTextField' />
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Max participants:
                        <input required type='number' className='clsTextField' />
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
                        <input {...getInputProps({
                                            placeholder: 'Address',
                                            className: 'clsTextField',
                                            required: true
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
                <div className='form-group'>
                    <label>
                        Upload Cover Photo:
                        <input type='file' onChange={this.fileSelectedHandler} className='clsTextField' />
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
                    className="card">
                    {body}
                    <button onClick={this.handleCloseCreateEvent}>
                        Cancel
                </button>
                </ReactModal>
            </div>
        );
    };
}
export default AddEvent;