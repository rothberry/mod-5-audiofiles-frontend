/*eslint-disable */
import React from "react"
import "../App.css"
import LoginForm from "./LoginForm"
import NewUserForm from "./NewUserForm"
import UserProfile from "./UserProfile"
import FeedContainer from "./FeedContainer"
import NewSongForm from "./NewSongForm"
import Nav from "./Nav"
import { connect } from "react-redux"
import { Router, Route, withRouter, Switch, Redirect } from "react-router-dom"
import {
  currentUser,
  logoutUser,
  fetchAllUsers,
  fetchAllSongs,
  setAllFolloweds,
  setAllFollowers,
  fetchAllComments
} from "../actions"
import SongShowPage from "./SongShowPage"

class App extends React.Component {
  // ! FOR TESTING OUT REDUX

  componentDidMount() {
    this.props.currentUser()
    this.props.fetchAllSongs()
    this.props.fetchAllUsers()
    // TODO Currently fetching all comments on SongShowPage
    // ? this.props.fetchAllComments()
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
    // console.log('app state: ', this.state)
    // this.setAllFollowings()
    // TODO
    // ? Need the 'isCurrentUser' 'isLoggedIn' to correct the paths
    return (
      <div className="app-container">
        {/* <Switch> */}
        <Nav />
        <br /> <br />
        <Route path="/login" render={() => <LoginForm />} />
        <Route path="/createaccount" render={() => <NewUserForm />} />
        <Route path="/profile/:id" render={() => <UserProfile />} />
        <Route path="/feed" render={() => <FeedContainer />} />
        <Route path="/newsong" render={() => <NewSongForm />} />
        <Route path="/songs/:id" render={() => <SongShowPage />} />
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
  {
    currentUser,
    logoutUser,
    fetchAllUsers,
    fetchAllSongs,
    setAllFolloweds,
    setAllFollowers,
    fetchAllComments
  }
)(withRouter(App))
