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
    await this.props.fetchAllUsers()
    await this.props.fetchAllSongs()
    await this.props.fetchAllComments()
    await this.props.fetchAllTags()
    // const { allUsers, user } = this.props
    // this.props.createFollowersArray(allUsers, user)
    // this.props.createFollowedsArray(allUsers, user)
  }

  render() {
    // ? Need the 'isCurrentUser' 'isLoggedIn' to correct the paths
    return (
      <div className="app-container">
        {/* <Switch> */}
        <Nav />
        <br /> <br />
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/createaccount" render={() => <NewUserForm />} />
        <Route path="/profile/:id" render={() => <UserProfileContainer />} />
        <Route path="/feed" render={() => <FeedContainer />} />
        <Route path="/newsong" render={() => <NewSongForm />} />
        <Route path="/songs/:id" render={() => <SongShowPage />} />
        <Route path="/editaccount" render={() => <EditUserForm />} />
        {/* </Switch> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allUsers: state.allUsers
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
