/*eslint-disable */
import React from "react"
import "../App.css"
import LoginForm from "./LoginForm"
import NewUserForm from "./NewUserForm"
import UserProfile from "./UserProfile"
import FeedContainer from "./FeedContainer"
import NewSongForm from "./NewSongForm"
// import SongFeedComponent from "./SongFeedComponent"
import { connect } from "react-redux"
import { Router, Route, withRouter, Switch, Redirect } from "react-router-dom"
import {
  currentUser,
  logoutUser,
  fetchAllUsers,
  fetchAllSongs,
  setAllFolloweds,
  setAllFollowers
} from "../actions"

class App extends React.Component {
  // ! FOR TESTING OUT REDUX
  // state = {
  //   allFollowers: [],
  //   allFolloweds: []
  // }
  componentDidMount() {
    this.props.fetchAllSongs()
    this.props.fetchAllUsers()
    this.props.currentUser()
    // this.props.fetchFollowing(this.props.user.id)
  }

  handleLogout = e => {
    localStorage.clear()
    this.props.logoutUser()
    this.props.history.push("/login")
  }

  setAllFollowings = () => {
    let followedsIDArray = []
    let followersIDArray = []
    let followedsArray = []
    let followersArray = []

    const userFollowings = this.props.allUsers.find(
      user => user.id === this.props.user.id
    )
    if (userFollowings) {
      followedsIDArray = userFollowings.active_relationships.map(
        rel => rel.followed_id
      )
      followedsArray = followedsIDArray.map(followedsID => {
        return this.props.allUsers.find(user => {
          return user.id === followedsID
        })
      })
      followersIDArray = userFollowings.passive_relationships.map(
        rel => rel.follower_id
      )
      followersArray = followersIDArray.map(followersID => {
        return this.props.allUsers.find(user => {
          return user.id === followersID
        })
      })
    }
    this.props.setAllFolloweds(followedsArray)
    this.props.setAllFollowers(followersArray)
  }

  render() {
    // console.log('app props: ', this.props)
    // console.log(this.state)
    this.setAllFollowings()
    return (
      <div className="app-container">
        {/* <Switch> */}
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/createaccount" render={() => <NewUserForm />} />
        <Route
          // TODO Need to go to /profile/${displayUserId}
          path="/profile/:id"
          render={() => <UserProfile handleLogout={this.handleLogout} />}
        />
        <Route path="/feed" render={() => <FeedContainer />} />
        <Route path="/newsong" render={() => <NewSongForm />} />
        {/* <Route path='/songs/:id' render={() => </>} /> */}
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
  // mapDispatchToProps
  {
    currentUser,
    logoutUser,
    fetchAllUsers,
    fetchAllSongs,
    setAllFolloweds,
    setAllFollowers
  }
)(withRouter(App))
