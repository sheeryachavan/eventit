import React, {Component} from 'react'

class CreateAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formControls: {
        name: {
          value: null,
          placeholder: "Name:"
        },
        email: {
          value: null,
          placeholder: "Email address:"
        },
        password: {
          value: null,
          placeholder: "Password:"
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Create Account</h1>
        <form>
          <label>
            Name:
            <input 
            type="text" 
            name="name"
            onChange={this.changeHandler}/>
          </label>
          <label>
            Email:
            <input 
            type="text" 
            name="email"
            onChange={this.changeHandler}/>
          </label>
          <label>
            Password:
            <input 
            type="text" 
            name="password" 
            onChange={this.changeHandler}/>
          </label>
          <input type="submit" value="Submit" onClick={this.submit}/>
        </form>
      </div>
    )
  }

  changeHandler = event => {
    const name = event.target.name
    const value = event.target.value
    console.log(name)
    console.log(value)
    this.setState({
      formControls: {
        [name]: value
      }
    })
  }

  submit() {
    console.log("Submitted")
  }

}

export default CreateAccount