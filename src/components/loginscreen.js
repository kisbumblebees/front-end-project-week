import React from "react";
import "./loginscreen.css";
import { Form, FormGroup, Input } from "reactstrap";
import LambdaButton from "./lambdabutton.js";
import { Alert } from "reactstrap";

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
    const stuffToRender = [
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
        <div id="login-buttons">
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
        </div>
      </Form>
    ];
    if (this.props.appState === "fetching")
      stuffToRender.push(
        <Alert className="loading-alert" color="dark">
          Loading ...
        </Alert>
      );
    else if (this.props.appState === "error")
      stuffToRender.push(
        <Alert className="error-alert" color="danger">
          {this.props.error.message}
        </Alert>
      );
    return <div id="login-screen">{stuffToRender}</div>;
  }
}

export default LoginScreen;
