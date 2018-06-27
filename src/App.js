import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import "./App.css";
import ContentArea from "./components/contentarea.js";
import SideMenu from "./components/sidemenu.js";
import LoginScreen from "./components/loginscreen.js";
import { connect } from "react-redux";
import {
  fetcher,
  startCreate,
  goToList,
  viewNote,
  startDelete,
  saveNew,
  reallyDelete,
  cancelDelete,
  editNote,
  saveEdit,
  alphabetizeNotes,
  shortestNotes,
  longestNotes,
  revAlphabetizeNotes,
  createUser,
  loginUser,
  logOut
} from "./actions";

const backendUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://back-end-project-zach-campbell.herokuapp.com";

//The main app.
class App extends Component {
  //Render the two main subcomponents, SideMenu and ContentArea, and pass them
  //their props.
  render() {
    if (this.props.loggedIn) {
      return (
        <div className="App">
          <Row>
            <Col className="left-side" xs="3">
              <SideMenu
                logOut={this.props.logOut}
                message={this.props.message}
                user={this.props.user}
                loggedIn={this.props.loggedIn}
                backendUrl={backendUrl}
                listMethod={this.props.goToList}
                createMethod={this.props.startCreate}
                alphabetizeNotes={this.props.alphabetizeNotes}
                revAlphabetizeNotes={this.props.revAlphabetizeNotes}
                shortestNotes={this.props.shortestNotes}
                longestNotes={this.props.longestNotes}
                appState={this.props.appState}
                error={this.props.error}
                fetcher={this.props.fetcher}
              />
            </Col>
            <Col className="content" xs="9">
              <ContentArea
                loggedIn={this.props.loggedIn}
                backendUrl={backendUrl}
                viewMethod={this.props.viewNote}
                appState={this.props.appState}
                notes={this.props.notes}
                viewId={this.props.viewId}
                deleteMethod={this.props.startDelete}
                reallyDeleteMethod={this.props.reallyDelete}
                cancelDeleteMethod={this.props.cancelDelete}
                editMethod={this.props.editNote}
                saveEditMethod={this.props.saveEdit}
                saveNewMethod={this.props.saveNew}
                fetcher={this.props.fetcher}
                error={this.props.error}
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <LoginScreen
          error={this.props.error}
          appState={this.props.appState}
          createUser={this.props.createUser}
          loginUser={this.props.loginUser}
          backendUrl={backendUrl}
          fetcher={this.props.fetcher}
        />
      );
    }
  }
}

//tells connect how the contents of its store can be made into props
const mapStateToProps = state => {
  return {
    notes: state.notes,
    appState: state.appState,
    viewId: state.viewId,
    error: state.error,
    loggedIn: state.loggedIn,
    user: state.user,
    message: state.message
  };
};

//Redux magic
export default connect(
  mapStateToProps,
  {
    fetcher,
    startCreate,
    goToList,
    viewNote,
    startDelete,
    saveNew,
    reallyDelete,
    cancelDelete,
    editNote,
    saveEdit,
    alphabetizeNotes,
    shortestNotes,
    longestNotes,
    revAlphabetizeNotes,
    createUser,
    loginUser,
    logOut
  }
)(App);
