import React from "react";
import "./noteform.css";
import { Form, FormGroup, Input } from "reactstrap";
import LambdaButton from "./lambdabutton.js";

class LoginScreen extends React.Component {
  //Store the inputs on local component state for now.
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  //Update component state as user types.
  handleFormType = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //The HTML:
  render() {
    return (
      <Form id="login-form">
        <h5 className="login-form-heading">{this.props.topText}</h5>
        <FormGroup>
          <Input
            name="username"
            onChange={this.handleFormType}
            id="uname-input"
            placeholder="username"
            value={this.state.username}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            onChange={this.handleFormType}
            name="password"
            id="password-input"
            placeholder="password"
            value={this.state.password}
          />
        </FormGroup>
        <LambdaButton
          myFunc={() =>
            this.props.loginUser(this.props.fetcher, this.props.backendUrl, {
              username: this.state.username,
              password: this.state.password
            })
          }
          text="Login"
          color="green"
        />
        <LambdaButton
          myFunc={() =>
            this.props.createUser(this.props.fetcher, this.props.backendUrl, {
              username: this.state.username,
              password: this.state.password
            })
          }
          text="New User"
          color="green"
        />
      </Form>
    );
  }
}

export default LoginScreen;
