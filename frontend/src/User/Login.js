import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { auth } from '../firebase';
import { connect } from "react-redux";
import { UserDetails } from "../action";
import './User.css';
import MessageHandler from '../Message/messageHandler'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './UserFormStyle.css'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      redirect: false,
      isError: false,
      errorMessage: ''
    }
  }

  render() {
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
      <div className="limiter">
        {error}
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title">
                Member Login
					</span>

              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="password" placeholder="Password" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={this.submit.bind(this)}>
                  Login
						</button>
              </div>
              <Link to="/signup">
                <div className="text-center p-t-136">
                  Create your Account
							<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>

                </div>
              </Link>

            </form>

            <Link to="/" style={{ hidden: true }} id="test">
            </Link>
          </div>

        </div>
      </div>

    )
  }

  changeHandler = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  async submit(event) {
    event.preventDefault();
    if (this.state.email === "" || this.state.password === "") {
      console.log("Empty field")
      return
    }
    var msgtemp = await auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (res) => {
        const user = res.user
        console.log("user");
        console.log(user);
        await this.props.UserDetails(user.uid);


      }).catch(err => {
        this.setState({ isError: true, errorMessage: err.message });
        return err;
      });
      debugger;
    if (msgtemp == undefined) {
      var link = document.getElementById('test');
      link.click();
    }
    else {
      this.setState({ isError: true, errorMessage: msgtemp.message })
    }
    // history.push("/events");
  }

}

// export default Login

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { UserDetails })(Login);