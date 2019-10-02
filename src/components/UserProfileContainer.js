/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { Button, Grid, Modal } from "semantic-ui-react"
import SongFeedComponent from "./SongFeedComponent"
import UserProfileSIde from "./UserProfileSIde"
import {
  findDisplayUser,
  followUser,
  currentUser,
  currentRelationship,
  setCurrentUser,
  deleteUser,
  createFollowersArray,
  createFollowedsArray
} from "../actions"

class UserProfileContainer extends Component {
  componentDidMount() {
    this.asyncUserProfileProps()
  }

  asyncUserProfileProps = async () => {
    await this.props.currentUser()
    await this.props.findDisplayUser(this.props.allUsers, this.props.history)
    await this.props.setCurrentUser(this.props.displayUser, this.props.user)
    await this.props.createFollowersArray(this.props.allUsers, this.props.user)
    await this.props.createFollowedsArray(this.props.allUsers, this.props.user)
    if (!!this.props.displayUser.passive_relationships) {
      const relationship = this.props.displayUser.passive_relationships.find(
        rel => {
          return rel.follower_id === this.props.user.id
        }
      )
      this.props.currentRelationship(relationship)
    }
  }

  render() {
    const { isCurrentUser } = this.props.user
    const { username, name, location, bio, id } = this.props.displayUser
    const filteredDisplayUserSongs = this.props.allSongs.filter(displaySong => {
      return displaySong.song.user_id === id
    })
    const mappedDisplayUserSongFeed = filteredDisplayUserSongs.map(
      displaySong => {
        return (
          <SongFeedComponent songData={displaySong} userClickDisabled={true} />
        )
      }
    )
    return !!this.props.displayUser.id ? (
      <Grid className={`user-profile-${id}`} columns={2}>
        <Grid.Column>{mappedDisplayUserSongFeed}</Grid.Column>
        <UserProfileSIde />
      </Grid>
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
  {
    findDisplayUser,
    followUser,
    currentUser,
    currentRelationship,
    setCurrentUser,
    deleteUser,
    createFollowersArray,
    createFollowedsArray
  }
)(withRouter(UserProfileContainer))

{
  /* <Modal trigger={<Button content="Delete" />}>
<Modal.Header>Account Deletion:</Modal.Header>
<Modal.Content>
  <p>Are you sure you want to delete your account?</p>
</Modal.Content>
<Modal.Actions>
  <Button open={close}>
    No
  </Button>
  <Button onClick={user_id => this.props.deleteUser(this.props.user.id)}>
    Yes
  </Button>
</Modal.Actions>
</Modal> */
}
