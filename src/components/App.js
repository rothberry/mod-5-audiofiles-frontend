/*eslint-disable */
import React from "react"
import "../App.css"
import LoginForm from "./LoginForm"
import NewUserForm from "./NewUserForm"
import UserProfileContainer from "./UserProfileContainer"
import FeedContainer from "./FeedContainer"
import NewSongForm from "./NewSongForm"
import SongShowPage from "./SongShowPage"
import EditUserForm from "./EditUserForm"
import Nav from "./Nav"
import { connect } from "react-redux"
import { Router, Route, withRouter, Switch, Redirect } from "react-router-dom"
import {
  currentUser,
  logoutUser,
  fetchAllUsers,
  fetchAllSongs,
  fetchAllComments,
  fetchAllTags,
  createFollowersArray,
  createFollowedsArray
} from "../actions"

class App extends React.Component {
  componentDidMount() {
    this.asyncFetches()
  }

  asyncFetches = async () => {
    await this.props.currentUser()
    // await this.props.fetchAllUsers()
    // await this.props.fetchAllSongs()
    // await this.props.fetchAllComments()
    // this.props.fetchAllTags()
    // const { allUsers, user } = this.props
    // this.props.createFollowersArray(allUsers, user)
    // this.props.createFollowedsArray(allUsers, user)
  }

  render() {
    const { isLoggedIn } = this.props.user
    return (
      <div className="app-container">
        <Nav />
        <br /> <br />
        <Route exact path="/" component={FeedContainer} />
        <Switch>
          <Route exact path="/login">
            {!!isLoggedIn ? <Redirect push to="/" /> : <LoginForm />}
          </Route>
          <Route exact path="/createaccount">
            {!!isLoggedIn ? <Redirect push to="/" /> : <NewUserForm />}
          </Route>
          <Route path="/profile/:id" component={UserProfileContainer} />
          <Route path="/songs/:id" component={SongShowPage} />
          <Route exact path="/newsong">
            {!!isLoggedIn ? <NewSongForm /> : <Redirect push to="/login" />}
          </Route>
        </Switch>
        <Route path="/editaccount" render={() => <EditUserForm />} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    // allUsers: state.allUsers
  }
}

export default connect(
  mapStateToProps,
  {
    currentUser,
    logoutUser,
    fetchAllUsers,
    fetchAllSongs,
    fetchAllComments,
    fetchAllTags,
    createFollowersArray,
    createFollowedsArray
  }
)(withRouter(App))
