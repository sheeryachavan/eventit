import React, { Component } from 'react'
import { classnames } from './helpers';
import api from './api';
import MessageHandler from './Message/messageHandler'
import PlacesAutocomplete from 'react-places-autocomplete';
import { Link } from 'react-router-dom';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import './search.css';
class SearchEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isError: false,
      isGeocoding: false,
    };
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    debugger;
    geocodeByAddress(selected)
      .then((res) => {

        var { lat, lng } = getLatLng(res[0])
        this.setState({
          latitude: lat,
          longitude: lng,
          address: res[0]["formatted_address"],
          isGeocoding: false,
        });
        var link = document.getElementById('test');
        link.click();
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        this.setState({ isError: true });
        this.setState({ errorMessage: error });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status);
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
    } = this.state;
    var error = null;
    if (this.state.isError) {
      error = <MessageHandler message={{ isError: this.state.isError, message: this.state.errorMessage }} />
    }
    else if (!this.state.isError && this.state.errorMessage !== '') {
      error = <MessageHandler message={{ isError: this.state.isError, message: this.state.errorMessage }} />
    }
    else {
      error = null
    }
    return (
      <div >
        {error}
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}>
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="clssearch-container">
                <div className="clssearch-box">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'clssearch-txt',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                        </button>
                  )}
                  {suggestions.length > 0 && (
                    <div className=" clsSuggestionContainer">
                      {suggestions.map(suggestion => {
                        const className = classnames('clsSuggestionItem', {
                          'clsSuggestionItem-active': suggestion.active,
                        });

                        return (
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
                      })}
                    </div>
                  )}
                </div>

              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Demo__geocode-result-header">Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
              </div>
            ) : (
                <div>
                  <div className="Demo__geocode-result-item--lat">
                    <label>Latitude:</label>
                    <span>{latitude}</span>
                  </div>
                  <div className="Demo__geocode-result-item--lng">
                    <label>Longitude:</label>
                    <span>{longitude}</span>
                  </div>
                </div>
              )}
          </div>
        )}
        <Link to={{
          pathname: "/events", address: {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            address: this.state.address
          }
        }} style={{ hidden: true }} id="test">
        </Link>
      </div>
    );
  }

}
export default SearchEvent;