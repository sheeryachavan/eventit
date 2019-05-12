import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { auth } from '../firebase'
import { Link } from 'react-router-dom';
class CreateAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: ""
    }
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title">
                Get On Board!
					</span>

              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="name" placeholder="Hi! What's your name?" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
              </div>
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
              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="confirmpassword" placeholder="Confirm Password" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="tel" name="phone" placeholder="Phone" onChange={this.changeHandler} />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-phone" aria-hidden="true"></i>
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" onClick={this.submit.bind(this)}>
                  SignUp
						</button>
              </div>
            </form>

            <Link to="/login" style={{ hidden: true }} id="test">
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

  submit() {
    if (this.state.email === "" || this.state.password === "") {
      console.log("Empty field")
      return
    }
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        const user = res.user
        console.log(JSON.parse(JSON.stringify('{"user_name":"' + String(user.email) + '","user_email" : "' + String(user.email) + '","user_id" : "' + String(user.uid) + '","name" : "' + String(this.state.name) + '"}')))


        //const b=JSON.parse(JSON.stringify('{"user_name":"'+String(user.email)+'","user_id" : "'+String(user.uid)+'"}'));

        const url = 'http://localhost:3001/eventit/user/addUser';
        fetch(url, {
          method: 'post',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.parse(JSON.stringify('{"user_name":"' + String(user.email) + '","user_email" : "' + String(user.email) + '","user_id" : "' + String(user.uid) + '","name" : "' + String(this.state.name) + '","phone" : "' + String(this.state.phone) + '"}'))


        })
      })
    var link = document.getElementById('test');
    link.click();
  }

}

export default CreateAccount