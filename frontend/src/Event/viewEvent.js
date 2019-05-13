import React, { Component } from 'react'
import MessageHandler from '../Message/messageHandler'
import api from '../api';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import './viewEvent.css';
import logo from '../images/logo2.png';
class ViewEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            eventId: undefined,
            eventData: undefined,
            isJoined: false,
            isError: false,
            errorMessage: ''
        }
        this.registerClick = this.registerClick.bind(this);
    }
    async componentDidMount() {
        try {
            this.setState({ eventId: this.props.match.params.id });
            await this.getEvent();
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }

    }
    async getEvent() {
        try {
            this.setState({ isError: false, errorMessage: '' });
            const l_objResponse = await api.get(`/eventit/event/getevent/${this.props.match.params.id}`);
            this.setState({ eventData: l_objResponse.data });
            if (this.props.id != null && this.state.eventData.event_joiners.indexOf(this.props.id) > -1) {
                this.setState({ isJoined: true });
            }
        } catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }

    }
    async registerClick() {
        try {
            this.setState({ isError: false, errorMessage: '' });
            if (this.props.id != null) {
                const data = {
                    "event_id": this.props.match.params.id,
                    "user_id": this.props.id,

                };
                const url = `/eventit/event/joinEvent`;
                this.setState({
                    isJoined:true
                })
                var temp = await api.post(url, data);
            }
            else {
                var link = document.getElementById('test');
                link.click();
            }
        }
        catch (err) {
            this.setState({ isError: true, errorMessage: err });
            return err;
        }
    }
    render() {
        let actionBtn = null;
        let body = null;
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
        if (this.props.id !== null && this.state.eventData && this.state.eventData.event_owner && (this.props.id === this.state.eventData.event_owner)) {
            actionBtn = <Link to={`/events/editevent/${this.props.match.params.id}`}><button className="clsUpdateBtn"> Update Event</button></Link>
        }
        else if (this.state.isJoined)
            actionBtn = <button disabled className="clsRegisteredBtn"> You are Registered!</button>
        else
            actionBtn = <button onClick={this.registerClick} className="clsUpdateBtn"> Register</button>
        if (this.state.eventData !== undefined) {
            body = (<div className="container">
                {error}
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">

                        <div className="col-sm-12">
                            <div>
                                <img src={logo} alt="logo" className="clsLogoImage" />
                            </div>
                            <div className="col-xs-12 col-sm-8">

                                <h2>{this.state.eventData.event_name}</h2>
                                <p><div className="clsLabelDiv">Description:</div>{this.state.eventData.event_description} </p>
                                <div className="clsIndiEventCard">
                                    <div className="clsIndiEventCardInner">
                                        <div className="clsLabelDiv">Address:</div> {this.state.eventData.event_location}
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="col-xs-12 col-sm-4 col-lg-6">
                        {actionBtn}
                        <div className="clsIndiEventCard">
                            <div className="clsIndiEventCardInner">
                                <div className="clsLabelDiv">Time:</div> {this.state.eventData.event_begin} to {this.state.eventData.event_end}
                            </div>

                        </div>
                        <div className="clsIndiEventCard">
                            <div className="clsIndiEventCardInner">
                                <div className="clsContactDiv">
                                    Contact:
                                </div>
                                <div>
                                    <div className="clsLabelDiv">Phone:</div>{this.state.eventData.event_ownerPhone}
                                </div>
                                <div>
                                    <div className="clsLabelDiv">Email:</div>{this.state.eventData.event_ownerContact}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>)
                ;
        }

        return (<div className="globalContainer">
            {body}
            <Link to="/login" style={{ hidden: true }} id="test">
            </Link>
        </div>);
    };
}
const mapStateToProps = (state) => {
    return {
        id: state.authentication.id
    };
}

export default connect(mapStateToProps)(ViewEvent);
// export default ViewEvent;