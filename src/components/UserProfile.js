/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Button } from "semantic-ui-react"
// import {fetchFollowing} from '../actions'

class UserProfile extends Component {
  findUser = displayUserID => {
    if (this.props.allUsers.length > 0) {
      return this.props.allUsers.find(u => {
        return u.id === displayUserID
      })
    }
  }

  // componentDidMount() {
  //   this.props.fetchFollowing()
  // }

  handleFollowUser = (followed_id, follower_id) => {
    console.log("followed: ", followed_id)
    console.log("follower: ", follower_id)
    // TODO Sends fetch to Followings Model with
  }

  goToNewSong = () => {
    this.props.history.push('/newsong')
  }

  render() {
    const displayUserID = Number(this.props.history.location.pathname.slice(9))
    // const { username, name, location, bio, id } = this.props.user
    // const { allUsers } = this.props
    // this.props.fetchFollowing(this.props.user.id)
    const displayUser = this.findUser(displayUserID)
    const { username, name, location, bio, id } = displayUser
    const isCurrentUser = id === this.props.user.id
    const isFollowing = this.props.user.id === this.props.followeds.find(f => f.id === id )
    console.log('current user? ', isCurrentUser)
    console.log('following? ', isFollowing)
    return displayUser ? (
      <div className={`user-profile-${id}`}>
        Profile Page
        <h1>Username: {username}</h1>
        <h1>Name: {name}</h1>
        <h1>location: {location}</h1>
        <p>Bio: {bio}</p>
        {
          isCurrentUser ? null : (
          <Button
            onClick={(followed_id, follower_id) =>
              this.handleFollowUser(displayUserID, this.props.user.id)
            }
          >
            Follow Me!
          </Button>
        )}
        <br />
        <Link onClick={this.goToNewSong}>New Song!</Link> <br />
        <Link onClick={this.props.handleLogout}>Logout</Link>
      </div>
    ) : (
      <div>
        No User Profile
        <Link onClick={this.props.handleLogout}>Logout</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allUsers: state.allUsers,
    followeds: state.followeds,
    followers: state.followers
  }
}
export default connect(
  mapStateToProps,
  null
  // {fetchFollowing}
)(withRouter(UserProfile))
