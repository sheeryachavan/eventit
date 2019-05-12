import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { auth } from '../firebase'
import './UserFormStyle.css'


class CreateAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  render() {
    return (
      <div>
        <Container className="Create-Account">
          <form className="account-form">
            <h1>Create Account</h1>
            <Row className="account-row">
              <input
                type="text"
                class="text-input"
                name="name"
                onChange={this.changeHandler}
                placeholder="Name:"
              />
            </Row>
            <Row class="text-input" className="account-row">
              <input
                type="text"
                class="text-input"
                name="email"
                onChange={this.changeHandler}
                placeholder="Email address:"
              />
            </Row>
            <Row class="text-input" className="account-row">
              <input
                type="password"
                class="text-input"
                name="password"
                onChange={this.changeHandler}
                placeholder="Password:"
              />
            </Row>
            <input
              type="button"
              class="button"
              value="Submit"
              onClick={this.submit.bind(this)}
            />
          </form>
        </Container>
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
        console.log(JSON.parse(JSON.stringify('{"user_name":"'+String(user.email)+'","user_email" : "'+String(user.email)+'","user_id" : "'+String(user.uid)+'","name" : "'+String(this.state.name)+'"}')))
        
        
        //const b=JSON.parse(JSON.stringify('{"user_name":"'+String(user.email)+'","user_id" : "'+String(user.uid)+'"}'));
        
        const url = 'http://localhost:3001/eventit/user/addUser';
        fetch(url, {
          method: 'post',
          headers: {
              'Access-Control-Allow-Origin':'*',
              'Content-Type':'application/json'},
          body: JSON.parse(JSON.stringify('{"user_name":"'+String(user.email)+'","user_email" : "'+String(user.email)+'","user_id" : "'+String(user.uid)+'","name" : "'+String(this.state.name)+'"}'))
        
          
        })
      })
      
  }

}

export default CreateAccount