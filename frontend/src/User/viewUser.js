import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import api from '../api'
import { connect } from "react-redux";
class ViewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.id,
            userData: undefined
        }
    }
    componentWillMount() {


    }
    async componentDidMount() {
        if (this.props.id) {
            var url = await api.get(`eventit/user/profile/${this.props.id}`);
            this.setState({
                userData: JSON.stringify(url.data)
            });
            debugger;
        }
    }
    render() {
        let body = null;

        if (this.props.id != null) {
            body = (<div className="container">
                <div className="row">
                    <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                        <div className="well profile">
                            <div className="col-sm-12">
                                <div className="col-xs-12 col-sm-8">
                                    <h2>{this.state.userData.name}</h2>
                                    <p><strong>Email: </strong> {this.state.userData.user_name} </p>
                                    <p><strong>Phone: </strong> {this.state.userData.phone}</p>
                                </div>
                                <div className="col-xs-12 col-sm-4 text-center">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
                ;

        }
        else {
            debugger;
            body = (<div>
                <p>
                    Please <Link to="/login">Login</Link> or <Link to="/signup">Create an Account</Link>Create an Account to perform this action
            </p>
            </div>);
        }
        return (<div>
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

export default connect(mapStateToProps)(ViewUser);