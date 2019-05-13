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
        let body = null;
        if (this.props.id != null) {
            actionBtn = <Link to={`/events/editevent/${this.props.match.params.id}`}><button> Update Event</button></Link>
        }
        else
            actionBtn = <button> Register</button>
        if (this.state.eventData !== undefined) {
            body = (<div className="container">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                        <div className="well profile">
                            <div className="col-sm-12">
                                <div className="col-xs-12 col-sm-8">

                                    <h2>{this.state.eventData.event_name}</h2>
                                    <p><strong>Description: </strong> {this.state.eventData.event_description} </p>
                                   
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-4 col-lg-6">
                        {actionBtn}
                    </div>
                </div>

            </div>)
                ;
        }
        
        return (<div className="globalContainer">
            {body}
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