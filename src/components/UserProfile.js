/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Button, Grid } from "semantic-ui-react"
import SongFeedComponent from "./SongFeedComponent"
import {findDisplayUser} from '../actions'

class UserProfile extends Component {

  componentDidMount() {
    this.props.findDisplayUser(this.props.allUsers, this.props.history)
  }

  handleFollowUser = (followed_id, follower_id) => {
    console.log("followed: ", followed_id)
    console.log("follower: ", follower_id)
    // TODO Sends fetch to Followings Model with
  }

  render() {
    // console.log(this.props.displayUser)
    const { username, name, location, bio, id } = this.props.displayUser
    const filteredDisplayUserSongs = this.props.allSongs.filter(displaySong => {
      return displaySong.song.user_id === id 
    })
    const mappedDisplayUserSongFeed = filteredDisplayUserSongs.map(displaySong => {
      return <SongFeedComponent songData={displaySong} userClickDisabled={true}/>
    })
    const isCurrentUser = id === this.props.user.id
    const isFollowing = this.props.user.id === this.props.followeds.find(f => f.id === id)
    // console.log("current user? ", isCurrentUser)
    // console.log("following? ", isFollowing)
    return true ? (
      <div className={`user-profile-${id}`}>
        <Grid columns={2}>
          <Grid.Column>{mappedDisplayUserSongFeed}</Grid.Column>
          <Grid.Column>
            <h1>Username: {username}</h1>
            <h1>Name: {name}</h1>
            <h1>location: {location}</h1>
            <p>Bio: {bio}</p>
            {isCurrentUser ? null : (
              <Button
                onClick={(followed_id, follower_id) =>
                  this.handleFollowUser(id, this.props.user.id)
                }
              >
                Follow Me!
              </Button>
            )}
          </Grid.Column>
        </Grid>
      </div>
    ) : (
      <div>No User Profile</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    displayUser: state.displayUser,
    allSongs: state.allSongs,
    allUsers: state.allUsers,
    followeds: state.followeds,
    followers: state.followers
  }
}
export default connect(
  mapStateToProps,
  // null
  {findDisplayUser}
)(withRouter(UserProfile))
