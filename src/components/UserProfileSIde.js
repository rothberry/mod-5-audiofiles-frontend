/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Button, Grid, Modal, Image } from "semantic-ui-react"
import {
  findDisplayUser,
  followUser,
  currentUser,
  currentRelationship,
  setCurrentUser,
  deleteUser
} from "../actions"

class UserProfileSide extends Component {
  // handleFollowUser = (followed_id, follower_id) => {
  handleFollowUser = (followed, follower_id) => {
    // console.log("followed: ", followed.id)
    // console.log("follower: ", follower_id)
    this.props.followUser(followed, follower_id)
  }

  handleUnfollowUser = () => {
    // TODO Send DELETE fetch to backend
    // TODO Need the relationshipID
  }

  mapAllFollowers = () => {}

  handleDeleteUser = () => {}

  render() {
    const { isCurrentUser } = this.props.user
    const {
      username,
      name,
      location,
      bio,
      id,
      img_url,
      facebook_url,
      twitter_url,
      soundclound_url
    } = this.props.displayUser

    const mappedFollowers = () => {
      followers.map(fol => {
        console.log(fol)
        return (
          <Link to={`/profile/${fol.id}`}>{fol.username}</Link>
        )
      })
    }
    // console.log('displayuser: ', this.displayUser)
    // console.log(this.props)
    // TODO Need correct img urls cause i can't edit shit..
    return (
      <Grid.Column>
        {/* <Image src={img_url} circular /> */}
        <h1>Username: {username}</h1>
        <h1>Name: {name}</h1>
        <h1>location: {location}</h1>
        <p>Bio: {bio}</p>
        <h4>Followers: </h4>
        <div>{mappedFollowers}</div>

        {isCurrentUser ? (
          <Button
            onClick={(user_id, history) =>
              this.props.deleteUser(this.props.user.id, this.props.history)
            }
          >
            Delete Account
          </Button>
        ) : (
          <Button
            onClick={(followed, follower_id) =>
              this.handleFollowUser(this.props.displayUser, this.props.user.id)
            }
          >
            Follow Me!
          </Button>
        )}
      </Grid.Column>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    displayUser: state.displayUser,
    followeds: state.followeds,
    followers: state.followers
  }
}

export default connect(
  mapStateToProps,
  {
    findDisplayUser,
    followUser,
    currentUser,
    currentRelationship,
    setCurrentUser,
    deleteUser
  }
)(withRouter(UserProfileSide))
