/*eslint-disable */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import {
  Grid,
  Image,
  Icon,
  Label,
  Header,
  Sticky,
  Segment
} from "semantic-ui-react"
import {
  findDisplayUser,
  followUser,
  currentUser,
  currentRelationship,
  setCurrentUser,
  deleteUser
} from "../actions"

class FeedUserProfileSide extends Component {
  // handleFollowUser = (followed_id, follower_id) => {
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
      soundcloud_url
    } = this.props.feedUser
    // console.log("cur", this.props.showCurrentUser)
    // console.log("dis", this.props.displayUser)
    // console.log("feed", feedUser.username)
    const isFace = !facebook_url
    const isTwit = !twitter_url
    const isSound = !soundcloud_url
    const isImg = !!img_url
    let isFollowing
    if (!!this.props.user.id) {
      isFollowing = this.props.followers.find(user => {
        return user.id === this.props.user.id
      })
    }

    const mapFollowers = this.props.followers.map(fol => {
      return (
        <Label widths="equals">
          <Link
            onClick={(allUsers, history) =>
              this.props.findDisplayUser(
                this.props.allUsers,
                this.props.history
              )
            }
            to={`/profile/${fol.id}`}
          >
            {fol.username}
          </Link>
        </Label>
      )
    })

    return (
      <Grid.Column>
        <Segment circular>
          {isImg ? <Image src={img_url} circular alt="" /> : null}
          <Header size='large'>{username}</Header>
        </Segment>
      </Grid.Column>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    allUsers: state.allUsers,
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
)(withRouter(FeedUserProfileSide))
